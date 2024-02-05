import React from 'react';
import LoginForm from '@/app/(auth)/_components/LoginForm';

interface LoginProps {
  searchParams: {
    redirect: string | undefined;
  };
}

const LoginPage = ({ searchParams: { redirect } }: LoginProps) => {
  return (
    <div className="container relative pt-[10rem] md:pt-[14rem] lg:px-0">
      <LoginForm redirect={redirect} />
    </div>
  );
};

export default LoginPage;
