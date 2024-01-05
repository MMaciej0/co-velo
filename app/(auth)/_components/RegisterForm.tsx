'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TRegisterSchema,
  registerSchema,
} from '@/lib/validators/registerSchema';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { FaGoogle } from 'react-icons/fa';
import FormWrapper from '@/components/FromWrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/Heading';
import { register } from '@/actions/register';
import FormError from '@/components/FormError';

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const form = useForm<TRegisterSchema>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = (data) => {
    setSubmitError('');
    startTransition(async () => {
      register(data).then((callback) => {
        if (callback.error) {
          setSubmitError(callback?.error);
        }
      });
    });
  };

  return (
    <FormWrapper shadow>
      <Heading heading="Register" subheading="Please create your account." />
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="text"
                    placeholder="Username..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="email"
                    placeholder="Email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="Password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-4 pt-4">
            <FormError message={submitError} />
            <Button type="submit" disabled={isPending}>
              Register
            </Button>
            <Separator />
            <Button
              variant="outline"
              className="relative font-semibold"
              type="button"
              disabled={isPending}
              onClick={() =>
                signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT })
              }
            >
              <FaGoogle size={15} className="absolute left-8" />
              Register with Google
            </Button>
            <Link className={buttonVariants({ variant: 'link' })} href="/login">
              Already have an account? Sign in.
            </Link>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default RegisterForm;
