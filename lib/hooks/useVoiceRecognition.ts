'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  isSupported: boolean;
  error: string | null;
  permissionGranted: boolean | null;
}

export interface UseVoiceRecognitionOptions {
  onResult?: (finalTranscript: string) => void;
  continuous?: boolean;
  lang?: string;
}

export function useVoiceRecognition(options: UseVoiceRecognitionOptions = {}) {
  const { onResult, continuous = false, lang = 'en-US' } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  const recognitionRef = useRef<any>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  // Initialize SpeechRecognition on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      try {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = continuous;
        recognition.interimResults = true;
        recognition.lang = lang;

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
          setPermissionGranted(true);
        };

        recognition.onresult = (event: any) => {
          let currentFinal = '';
          let currentInterim = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const resultItem = event.results[i];
            const text = resultItem[0]?.transcript || '';
            if (resultItem.isFinal) {
              currentFinal += text;
            } else {
              currentInterim += text;
            }
          }

          if (currentFinal) {
            setTranscript((prev) => {
              const updated = prev ? `${prev} ${currentFinal.trim()}` : currentFinal.trim();
              if (onResultRef.current) {
                onResultRef.current(updated);
              }
              return updated;
            });
            setInterimTranscript('');
          } else {
            setInterimTranscript(currentInterim);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('[SpeechRecognition] error:', event.error);
          let errorMsg = 'Voice recognition error.';
          if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            errorMsg = 'Microphone access denied. Please allow microphone permissions in your browser.';
            setPermissionGranted(false);
          } else if (event.error === 'no-speech') {
            errorMsg = 'No speech detected. Please speak clearly into your microphone.';
          } else if (event.error === 'audio-capture') {
            errorMsg = 'No microphone was found or microphone is not working.';
          } else if (event.error === 'network') {
            errorMsg = 'Network error during voice recognition. Check your connection.';
          } else if (event.error === 'aborted') {
            errorMsg = '';
          }
          if (errorMsg) {
            setError(errorMsg);
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.error('[SpeechRecognition] init failed:', err);
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [continuous, lang]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Voice recognition is not supported in this browser. You can type commands directly.');
      return;
    }

    setError(null);
    setTranscript('');
    setInterimTranscript('');

    try {
      recognitionRef.current.start();
    } catch (err: any) {
      // If already started or aborting, stop and restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (_) {}
        }, 150);
      } catch (_) {}
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error,
    permissionGranted,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
  };
}
