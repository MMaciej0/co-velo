import React, { ButtonHTMLAttributes, FC } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button
      className="relative px-10"
      type="submit"
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 size={20} className="animate-spin absolute left-4" />
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
