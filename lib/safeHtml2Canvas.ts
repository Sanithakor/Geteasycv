import html2canvas from 'html2canvas';

export interface Html2CanvasOptions {
  allowTaint?: boolean;
  backgroundColor?: string | null;
  canvas?: any;
  foreignObjectRendering?: boolean;
  imageTimeout?: number;
  ignoreElements?: (element: Element) => boolean;
  logging?: boolean;
  onclone?: (doc: Document, element: HTMLElement) => void;
  proxy?: string;
  removeContainer?: boolean;
  scale?: number;
  useCORS?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  scrollX?: number;
  scrollY?: number;
  windowWidth?: number;
  windowHeight?: number;
}   

// Reusable canvas 2D context for fast color resolution
let sharedCanvasCtx: CanvasRenderingContext2D | null = null;

function getSharedCanvasCtx(): CanvasRenderingContext2D | null {
  if (typeof document === 'undefined') return null;
  if (!sharedCanvasCtx) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      sharedCanvasCtx = canvas.getContext('2d');
    } catch {
      sharedCanvasCtx = null;
    }
  }
  return sharedCanvasCtx;
}

/**
 * Converts any modern CSS color value (lab, oklch, oklab, color, color-mix)
 * into a standard rgb()/rgba() string using the browser's Canvas 2D context.
 */
export function normalizeCssColor(val: string, ctx?: CanvasRenderingContext2D | null): string {
  if (!val || typeof val !== 'string') return val;

  const lower = val.toLowerCase();
  if (
    lower.includes('lab(') ||
    lower.includes('oklch(') ||
    lower.includes('oklab(') ||
    lower.includes('color(') ||
    lower.includes('color-mix(')
  ) {
    try {
      const context = ctx || getSharedCanvasCtx();
      if (context) {
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillStyle = val;
        const computed = context.fillStyle;
        if (
          computed &&
          computed !== 'rgb(0, 0, 0)' &&
          !computed.includes('lab(') &&
          !computed.includes('oklch(')
        ) {
          return computed;
        }
      }
    } catch {
      // ignore
    }

    // Fallback regex replacement for unparseable color strings
    return 'rgb(30, 41, 59)';
  }

  return val;
}

/**
 * Sanitizes any string containing modern CSS color functions (lab, oklch, color-mix)
 * using robust regex matching that handles multiline, alpha slashes, and spaces.
 */
export function sanitizeColorString(text: string, ctx?: CanvasRenderingContext2D | null): string {
  if (!text || typeof text !== 'string') return text;
  
  const lower = text.toLowerCase();
  if (
    !lower.includes('lab(') &&
    !lower.includes('oklch(') &&
    !lower.includes('oklab(') &&
    !lower.includes('color(') &&
    !lower.includes('color-mix(')
  ) {
    return text;
  }

  // Matches lab(...), oklch(...), oklab(...), color(...), color-mix(...) including multiline & nested parens
  return text.replace(
    /(?:lab|oklch|oklab|color-mix|color)\s*\((?:[^()]+|\([^()]*\))*\)/gi,
    (match) => normalizeCssColor(match, ctx)
  );
}

/**
 * Wraps a CSSStyleDeclaration in a Proxy that intercepts color property queries
 * and normalizes lab()/oklch() values to standard rgb()/rgba().
 */
function createSafeStyleProxy(
  style: CSSStyleDeclaration,
  ctx?: CanvasRenderingContext2D | null
): CSSStyleDeclaration {
  return new Proxy(style, {
    get(target: any, prop: string | symbol, receiver: any) {
      if (prop === 'getPropertyValue') {
        return (cssPropName: string) => {
          const rawVal = target.getPropertyValue(cssPropName);
          return sanitizeColorString(rawVal, ctx);
        };
      }

      const val = Reflect.get(target, prop, receiver);
      if (typeof val === 'string') {
        return sanitizeColorString(val, ctx);
      }
      if (typeof val === 'function') {
        return val.bind(target);
      }
      return val;
    },
  });
}

/**
 * Prepares html2canvas options with an onclone callback that sanitizes
 * all computed and inline styles in the cloned document into standard rgb/rgba.
 */
export function getSafeHtml2CanvasOptions(
  options: Html2CanvasOptions = {}
): Html2CanvasOptions {
  const userOnClone = options.onclone;

  return {
    ...options,
    onclone: (clonedDoc: Document, element: HTMLElement) => {
      const ctx = getSharedCanvasCtx();

      // 1. Execute user onclone callback if provided
      if (userOnClone) {
        try {
          userOnClone(clonedDoc, element);
        } catch (e) {
          console.warn('User onclone error:', e);
        }
      }

      // 2. Set root baseline background & colors on cloned doc
      if (clonedDoc.documentElement) {
        clonedDoc.documentElement.style.backgroundColor = '#ffffff';
        clonedDoc.documentElement.style.color = '#111827';
      }
      if (clonedDoc.body) {
        clonedDoc.body.style.backgroundColor = '#ffffff';
        clonedDoc.body.style.color = '#111827';
      }
      if (element) {
        element.style.backgroundColor = element.style.backgroundColor || '#ffffff';
      }

      // 3. Intercept getComputedStyle on cloned document view
      const win = clonedDoc.defaultView || window;
      if (win && win.getComputedStyle) {
        const originalGetComputedStyle = win.getComputedStyle.bind(win);
        win.getComputedStyle = function (el: Element, pseudoElt?: string | null): CSSStyleDeclaration {
          const style = originalGetComputedStyle(el, pseudoElt);
          return createSafeStyleProxy(style, ctx);
        };
      }

      // 4. Sanitize all <style> blocks in the cloned document
      const styleEls = clonedDoc.querySelectorAll('style');
      styleEls.forEach((styleEl) => {
        if (styleEl.textContent) {
          styleEl.textContent = sanitizeColorString(styleEl.textContent, ctx);
        }
      });

      // 5. Inspect every element in cloned document and override any lab/oklch colors with !important inline rgb/rgba styles
      const targetEls = [
        clonedDoc.documentElement,
        clonedDoc.body,
        element,
        ...Array.from(clonedDoc.querySelectorAll('*')),
      ].filter(Boolean);

      const colorPropsToSanitize = [
        'color',
        'background-color',
        'border-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'outline-color',
        'text-decoration-color',
        'fill',
        'stroke',
        'box-shadow',
      ];

      targetEls.forEach((el) => {
        if (!(el instanceof HTMLElement || el instanceof SVGElement)) return;

        // Clean inline style attribute if present
        const inlineStyle = el.getAttribute('style');
        if (inlineStyle) {
          const cleanedStyle = sanitizeColorString(inlineStyle, ctx);
          if (cleanedStyle !== inlineStyle) {
            el.setAttribute('style', cleanedStyle);
          }
        }

        // Get computed style for element and override any modern color syntax
        try {
          const comp = win.getComputedStyle(el);
          if (comp) {
            colorPropsToSanitize.forEach((cssName) => {
              const val = comp.getPropertyValue(cssName);
              if (
                val &&
                (val.includes('lab(') ||
                  val.includes('oklch(') ||
                  val.includes('oklab(') ||
                  val.includes('color(') ||
                  val.includes('color-mix('))
              ) {
                const norm = sanitizeColorString(val, ctx);
                if (el.style) {
                  el.style.setProperty(cssName, norm, 'important');
                }
              }
            });
          }
        } catch {
          // Ignore uncomputable nodes
        }
      });
    },
  };
}

/**
 * Safe html2canvas exporter that ensures seamless PDF / image generation without color parsing crashes.
 */
export default async function safeHtml2Canvas(
  element: HTMLElement,
  options: Html2CanvasOptions = {}
): Promise<HTMLCanvasElement> {
  const safeOpts = getSafeHtml2CanvasOptions(options);
  const ctx = getSharedCanvasCtx();

  // Install temporary window.getComputedStyle proxy during html2canvas execution
  const win = typeof window !== 'undefined' ? window : null;
  let originalWindowGetComputedStyle: typeof window.getComputedStyle | null = null;

  if (win && win.getComputedStyle) {
    originalWindowGetComputedStyle = win.getComputedStyle.bind(win);
    win.getComputedStyle = function (el: Element, pseudoElt?: string | null): CSSStyleDeclaration {
      const style = originalWindowGetComputedStyle!(el, pseudoElt);
      return createSafeStyleProxy(style, ctx);
    };
  }

  try {
    return await html2canvas(element, safeOpts as any);
  } finally {
    if (win && originalWindowGetComputedStyle) {
      win.getComputedStyle = originalWindowGetComputedStyle;
    }
  }
}
