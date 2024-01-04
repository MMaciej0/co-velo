'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TRegisterSchema,
  registerSchema,
} from '@/lib/validators/registerSchema';

import { FaGoogle } from 'react-icons/fa';
import FormWrapper from '@/components/FromWrapper';
import { useToast } from '@/components/ui/use-toast';
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

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TRegisterSchema>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = (data) => {
    startTransition(async () => {
      try {
        const result = await register(data);
        if (result?.errors) {
          const error = result.errors;
          if (error.username) {
            form.setError('username', {
              type: 'server',
              message: error.username,
            });
          } else if (error.email) {
            form.setError('email', {
              type: 'server',
              message: error.email,
            });
          } else if (error.password) {
            form.setError('password', {
              type: 'server',
              message: error.password,
            });
          }
        }
      } catch (error) {
        toast({
          title: 'Something went wrong.',
          variant: 'destructive',
        });
      }
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
            <Button type="submit" disabled={isPending}>
              Register
            </Button>
            <Separator />
            <Button
              variant="outline"
              className="relative font-semibold"
              type="button"
              disabled={isPending}
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
