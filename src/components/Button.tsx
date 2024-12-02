import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  isLoading = false,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === 'primary' && "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        variant === 'secondary' && "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
        fullWidth && "w-full",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : children}
    </button>
  );
}