'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import LoadingButton from './LoadingButton';

const FormSubmitButton = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  return <LoadingButton isLoading={pending} {...props} />;
};

export default FormSubmitButton;
