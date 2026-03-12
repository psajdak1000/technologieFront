import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

// forwardRef pozwala przekazać ref z góry (od rodzica) do środka tego komponentu
const AutoResizeTextarea = forwardRef(({ value, onChange, onKeyDown, placeholder, className }, ref) => {
  
  // Wewnętrzny ref do prawdziwego elementu <textarea>
  const internalRef = useRef(null);

  // useImperativeHandle pozwala nam zdefiniować, co rodzic "zobaczy" pod refem.
  // Zamiast dawać dostęp do całego elementu DOM, dajemy tylko to, co chcemy.
  useImperativeHandle(ref, () => ({
    focus: () => {
      internalRef.current.focus();
    },
    // Możemy dodać np. metodę do ręcznego resetowania wysokości
    resetHeight: () => {
      if (internalRef.current) {
        internalRef.current.style.height = 'auto';
      }
    }
  }));

  // Funkcja dostosowująca wysokość
  const adjustHeight = () => {
    const element = internalRef.current;
    if (element) {
      // Resetujemy wysokość, żeby poprawnie obliczyć nową (gdybyśmy usuwali tekst)
      element.style.height = 'auto';
      // Ustawiamy wysokość równą zawartości (scrollHeight)
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  // Efekt: Dostosuj wysokość przy każdej zmianie wartości
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={internalRef}
      value={value}
      onChange={(e) => {
        onChange(e); // Przekazujemy zdarzenie wyżej
        adjustHeight(); // Dostosowujemy wysokość
      }}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
      rows={1}
      style={{
        width: '100%',
        resize: 'none', // Wyłączamy ręczne rozciąganie
        overflow: 'hidden', // Ukrywamy pasek przewijania
        minHeight: '20px',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        padding: '4px',
        border: '1px solid #3498db',
        borderRadius: '4px'
      }}
    />
  );
});

// Ważne: Komponenty z forwardRef warto nazwać dla DevTools
AutoResizeTextarea.displayName = 'AutoResizeTextarea';

export default AutoResizeTextarea;