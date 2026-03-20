import { useRef, useEffect } from 'react';

export function useRenderCount(componentName) {
  // Zaczynamy od 1, bo pierwsze wywołanie to już pierwszy render
  const renderCount = useRef(1);

  useEffect(() => {
    // Po każdym renderze zwiększamy licznik
    renderCount.current += 1;
  });

  // Używamy zmiennej środowiskowej Vite (import.meta.env.DEV), 
  // aby logi pojawiały się tylko podczas pisania kodu (tryb development)
  if (import.meta.env.DEV) {
    console.log(`🔄 [${componentName}] wyrenderowano: ${renderCount.current} raz(y)`);
  }
}