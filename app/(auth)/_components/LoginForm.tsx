'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TLoginSchema, loginSchema } from '@/lib/validators/loginSchema';
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
import { login } from '@/actions/login';
import FormError from '@/components/FormMessage';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const form = useForm<TLoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = (data) => {
    setSubmitError('');
    startTransition(() => {
      login(data).then((callback) => {
        if (callback?.error) {
          setSubmitError(callback.error);
        }
      });
    });
  };

  return (
    <FormWrapper shadow>
      <Heading heading="Login" subheading="Please sign in to your account." />
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button type="submit" disabled={isPending}>
              Login
            </Button>
            <Separator />
            <FormError message={submitError} />
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
              Login with Google
            </Button>
            <Link
              className={buttonVariants({ variant: 'link' })}
              href="/register"
            >
              Do not have an account? Sign up.
            </Link>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
