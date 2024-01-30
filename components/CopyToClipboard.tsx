'use client';

import React, { FC, useRef } from 'react';
import { cn, getErrorMessage } from '@/lib/utils';

import { Copy } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface CopyToClipboardProps {
  text: string;
  label?: string;
  labelStyle?: string;
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({
  text,
  label,
  labelStyle,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current && inputRef.current.select();
  };

  const handleCopyButton = async () => {
    if (!inputRef.current) return;
    const inputValue = inputRef.current.value;
    try {
      await navigator.clipboard.writeText(inputValue);
    } catch (error) {
      console.error(getErrorMessage(error));
    } finally {
      inputRef.current.value = 'Copied!';
      setTimeout(() => {
        if (!inputRef.current) return;
        inputRef.current.value = text;
      }, 500);
    }
  };

  return (
    <div className="relative flex items-center space-x-2">
      {label && (
        <Label htmlFor={label} className={cn(labelStyle)}>
          {label}
        </Label>
      )}
      <Input
        ref={inputRef}
        onFocus={handleFocus}
        type="text"
        id={label}
        defaultValue={text}
        className="pr-12 w-full truncate"
      />
      <Button
        onClick={handleCopyButton}
        variant="secondary"
        size="icon"
        className="absolute right-0"
      >
        <Copy />
      </Button>
    </div>
  );
};

export default CopyToClipboard;
