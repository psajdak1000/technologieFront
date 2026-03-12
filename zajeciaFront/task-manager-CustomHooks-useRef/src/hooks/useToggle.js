import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  // useCallback zapobiega niepotrzebnym re-renderom
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle, setValue];
};