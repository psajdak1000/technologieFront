import { useEffect } from 'react';

export const useKeyboardShortcut = (key, callback, modifiers = []) => {
  useEffect(() => {
    const handler = (event) => {
      // Sprawdź czy wciśnięto właściwy klawisz
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      // Sprawdź modyfikatory (Ctrl, Alt, Shift)
      if (modifiers.includes('ctrl') && !event.ctrlKey) return;
      if (modifiers.includes('shift') && !event.shiftKey) return;
      if (modifiers.includes('alt') && !event.altKey) return;

      event.preventDefault();
      callback();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, modifiers]);
};