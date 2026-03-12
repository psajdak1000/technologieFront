import { useEffect, useRef } from 'react';

// Hook zwracający wartość z poprzedniego renderu
export function usePrevious(value) {
  // Ref przechowuje wartość, ale zmiana refa nie powoduje re-renderu
  const ref = useRef();

  // useEffect uruchamia się PO wyrenderowaniu komponentu.
  // Zapisujemy w nim aktualną wartość, która stanie się "poprzednią" przy następnym renderze.
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Zwracamy to, co było zapisane wcześniej (zanim useEffect to nadpisał)
  return ref.current;
}