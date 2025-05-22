import { useState, useEffect } from 'react';

export function useFormData() {
  const [formData, setFormData] = useState(null);

  const save = (data: any) => {
    setFormData(data);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && formData) {
      // Removed localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  return { formData, save };
}