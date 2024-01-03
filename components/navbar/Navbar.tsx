import React, { FC } from 'react';
import Link from 'next/link';

import MaxWidthWrapper from '../MaxWidthWrapper';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const user = null;

  return (
    <div className="fixed top-0 inset-x-0 bg-background z-50">
      <MaxWidthWrapper>
        <div className="py-4">
          <div className="flex items-center justify-between h-full px-4 md:px-0">
            <div>
              <Link
                href="/"
                className="font-black text-2xl tracking-[-0.12em] text-primary"
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
                    className={buttonVariants({ variant: 'ghost' })}
                    href="/register"
                  >
                    Register
                  </Link>
                  <Separator orientation="vertical" />
                  <Link
                    className={buttonVariants({ variant: 'ghost' })}
                    href="/login"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <Separator />
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
