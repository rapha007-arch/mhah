import { useState } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description }) => {
    console.log('Toast:', title, description);
    // Simple implementation
    alert(`${title}: ${description}`);
  };

  return { toast, toasts };
}
