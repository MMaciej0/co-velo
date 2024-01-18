import React, { FC } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

const FormError: FC<FormErrorProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        'bg-destructive/15 p-3 rounded-md flex items-center space-x-6 text-sm text-destructive',
        className
      )}
    >
      <FaExclamationTriangle className="h-6 w-6 flex-shrink" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
