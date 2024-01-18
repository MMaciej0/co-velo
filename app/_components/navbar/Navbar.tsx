import React, { FC } from 'react';
import Link from 'next/link';
import { cn, getCurrentUser } from '@/lib/utils';

import ToggleThemeButton from '@/app/_components/navbar/ToggleThemeButton';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UserMenu from '@/app/_components/navbar/UserMenu';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="fixed top-0 inset-x-0 bg-background z-50">
      <MaxWidthWrapper>
        <div className="py-4">
          <div className="flex items-center justify-between h-full px-2 md:px-0">
            <div>
              <Link
                href="/"
                className="font-black text-2xl tracking-[-0.10em] text-primary"
              >
                COVELO
              </Link>
            </div>
            <div className="flex items-center">
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                        className: 'px-2 md:px-4',
                      })
                    )}
                    href="/register"
                  >
                    Register
                  </Link>
                  <Separator orientation="vertical" />
                  <Link
                    className={buttonVariants({
                      variant: 'ghost',
                      className: 'px-2 md:px-4',
                    })}
                    href="/login"
                  >
                    Login
                  </Link>
                </>
              )}
              <Separator orientation="vertical" />
              <ToggleThemeButton />
            </div>
          </div>
        </div>
        <Separator />
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
