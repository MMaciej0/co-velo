import React, { FC } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const formMessageVariants = cva(
  'rounded-md flex items-center space-x-6 p-3 text-sm font-medium border',
  {
    variants: {
      variant: {
        default: 'bg-background',
        destructive: 'bg-destructive/15 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface FormMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formMessageVariants> {
  message?: string;
  className?: string;
}

const FormMessage: FC<FormMessageProps> = ({
  message,
  variant,
  className,
  ...props
}) => {
  if (!message) return null;

  return (
    <div className={cn(formMessageVariants({ variant, className }))} {...props}>
      <FaExclamationTriangle className="h-8 w-8 flex-shrink" />
      <p>{message}</p>
    </div>
  );
};

export default FormMessage;
