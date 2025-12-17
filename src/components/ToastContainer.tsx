'use client';

import React from 'react';
import { useToast } from '@/lib/toast-provider';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={`
            px-4 py-3 rounded-lg shadow-lg pointer-events-auto cursor-pointer
            transition-all duration-300 animate-slide-in
            ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }
          `}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
