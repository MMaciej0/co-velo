import { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface MaxWidthWrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('w-full max-w-7xl m-auto px-2.5 md:px-20', className)}
      {...props}
    />
  );
};

export default MaxWidthWrapper;
