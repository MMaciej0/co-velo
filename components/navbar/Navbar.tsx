import React, { FC } from 'react';
import Link from 'next/link';

import ToggleThemeButton from './ToggleThemeButton';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const user = null;

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
              {user ? (
                <div>usermenu</div>
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
