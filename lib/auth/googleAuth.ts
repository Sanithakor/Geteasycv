/**
 * Google Authentication Client Helper
 * Interacts with Google Identity Services (GIS) Web SDK & /api/auth/google
 */

declare global {
  interface Window {
    google?: any;
  }
}

let cachedClientId: string | null = null;
const DEFAULT_CLIENT_ID = '194748209288-9ul30u4nj6anv16bij8ap85155g2ra8t.apps.googleusercontent.com';

/**
 * Gets Google OAuth Client ID synchronously from cache, env or default fallback
 */
export function getGoogleClientIdSync(): string {
  if (cachedClientId) return cachedClientId;
  
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    cachedClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    return cachedClientId;
  }

  return DEFAULT_CLIENT_ID;
}

/**
 * Gets Google OAuth Client ID dynamically from environment or backend API
 */
export async function getGoogleClientId(): Promise<string> {
  if (cachedClientId) return cachedClientId;

  const syncId = getGoogleClientIdSync();
  try {
    const res = await fetch('/api/auth/google', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.clientId) {
        cachedClientId = data.clientId;
        return data.clientId;
      }
    }
  } catch (err) {
    console.warn('[GOOGLE_CLIENT_ID_FETCH_WARN]', err);
  }

  cachedClientId = syncId;
  return syncId;
}

/**
 * Dynamically loads Google Identity Services (GIS) client script
 */
export function loadGoogleScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    
    // Check if script is already present and initialized
    if (window.google?.accounts?.id || window.google?.accounts?.oauth2) {
      return resolve(true);
    }

    const existingScript = document.getElementById('google-gsi-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

/**
 * Preloads GIS script and client ID as early as possible so popup is allowed by browser popup blockers
 */
export function preloadGoogleAuth(): void {
  if (typeof window === 'undefined') return;
  getGoogleClientId();
  loadGoogleScript();
}

// Auto-initialize in client environment on module load
if (typeof window !== 'undefined') {
  preloadGoogleAuth();
}

export interface GoogleAuthResponse {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
}

/**
 * Helper to launch OAuth2 Token Client popup (runs synchronously when GIS is preloaded)
 */
function runOAuth2Popup(clientId: string): Promise<GoogleAuthResponse> {
  return new Promise((resolve) => {
    let isSettled = false;

    if (!window.google?.accounts?.oauth2) {
      resolve({ success: false, error: 'Google Identity Services SDK not initialized.' });
      return;
    }

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid profile email',
        callback: async (tokenResponse: any) => {
          if (isSettled) return;
          if (tokenResponse && tokenResponse.access_token) {
            try {
              const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: tokenResponse.access_token }),
              });
              const data = await res.json();
              if (res.ok && data.success) {
                isSettled = true;
                resolve({ success: true, user: data.user, token: data.token });
                return;
              } else {
                isSettled = true;
                resolve({ success: false, error: data.error || 'Backend Google authentication failed' });
                return;
              }
            } catch (err: any) {
              console.error('[GOOGLE_CLIENT_BACKEND_ERR]', err);
              isSettled = true;
              resolve({ success: false, error: 'Could not connect to authentication server' });
              return;
            }
          }
          if (!isSettled) {
            isSettled = true;
            resolve({ success: false, error: 'Google sign-in popup was cancelled or failed' });
          }
        },
        error_callback: (error: any) => {
          console.error('[GOOGLE_CLIENT_OAUTH_ERR]', error);
          if (!isSettled) {
            isSettled = true;
            const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
            const errorStr = typeof error === 'string' ? error : JSON.stringify(error || '');
            let errMsg = 'Google sign-in error. Check browser settings or popup permissions.';
            if (error?.type === 'origin_mismatch' || errorStr.includes('origin_mismatch')) {
              errMsg = `Google OAuth origin mismatch: Please add "${origin}" to Authorized JavaScript origins in Google Cloud Console.`;
            } else if (error?.type === 'popup_failed_to_open' || errorStr.includes('popup')) {
              errMsg = 'Browser blocked Google sign-in popup. Please allow popups for this site and try again.';
            }
            resolve({ success: false, error: errMsg });
          }
        },
      });

      client.requestAccessToken();
    } catch (err: any) {
      console.warn('[GOOGLE_OAUTH2_INIT_WARN]', err);
      if (!isSettled) {
        isSettled = true;
        resolve({
          success: false,
          error: 'Browser blocked Google sign-in popup. Please allow popups for this site and try again.',
        });
      }
    }
  });
}

/**
 * Triggers real Google Sign-In popup using Google Identity Services (GIS)
 */
export async function triggerGoogleSignIn(): Promise<GoogleAuthResponse> {
  const syncClientId = getGoogleClientIdSync();

  // If GIS script is ready and loaded, launch popup synchronously in user click event
  if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
    return runOAuth2Popup(syncClientId);
  }

  // Fallback: If not ready yet, await script load & client ID fetch
  const clientId = await getGoogleClientId();
  const isLoaded = await loadGoogleScript();

  if (isLoaded && typeof window !== 'undefined' && window.google?.accounts) {
    if (window.google.accounts.oauth2) {
      return runOAuth2Popup(clientId);
    }

    // Secondary: Google Accounts ID (One-Tap / ID Token)
    if (window.google.accounts.id) {
      return new Promise((resolve) => {
        let isSettled = false;
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: async (idTokenResponse: any) => {
              if (isSettled) return;
              if (idTokenResponse && idTokenResponse.credential) {
                try {
                  const res = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ credential: idTokenResponse.credential }),
                  });
                  const data = await res.json();
                  if (res.ok && data.success) {
                    isSettled = true;
                    resolve({ success: true, user: data.user, token: data.token });
                    return;
                  } else {
                    isSettled = true;
                    resolve({ success: false, error: data.error || 'ID token verification failed' });
                    return;
                  }
                } catch (err: any) {
                  console.error('[GOOGLE_ID_BACKEND_ERR]', err);
                  isSettled = true;
                  resolve({ success: false, error: 'Could not connect to authentication server' });
                  return;
                }
              }
              if (!isSettled) {
                isSettled = true;
                resolve({ success: false, error: 'Google credential response invalid' });
              }
            },
          });

          window.google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              console.log('[GOOGLE_ID_PROMPT_NOT_DISPLAYED]', notification.getNotDisplayedReason());
            }
          });
        } catch (err) {
          console.warn('[GOOGLE_ID_INIT_WARN]', err);
        }
      });
    }
  }

  // Fallback: Direct API request if GIS script is blocked
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ demoMode: true }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, user: data.user, token: data.token };
    }
  } catch (err) {
    console.error('[GOOGLE_FALLBACK_ERR]', err);
  }

  return { success: false, error: 'Google Identity Service failed to load. Please check browser extensions or allow popups.' };
}
