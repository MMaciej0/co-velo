import React, { FC, FormHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface FormWrapperProps extends FormHTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
  className?: string;
}

const FormWrapper: FC<FormWrapperProps> = ({ shadow, className, ...props }) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[450px] p-4 pb-6 rounded-lg border-[1px] border-secondary',
        shadow && 'shadow-2xl shadow-primary',
        className
      )}
      {...props}
    />
  );
};

export default FormWrapper;
