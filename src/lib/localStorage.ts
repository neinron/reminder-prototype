import { useState, useEffect } from 'react';

const STORAGE_KEY = 'form-data';

export function useFormData() {
  const [formData, setFormData] = useState(() => {
    if (typeof window === 'undefined') return null;
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
  });

  const save = (data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    setFormData(data);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && formData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  return { formData, save };
}