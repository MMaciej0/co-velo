import Link from 'next/link';
import React from 'react';

const EmptyState = () => {
  return (
    <div className="text-center text-xl font-bold">
      No marching results.{' '}
      <Link className="text-primary" href="/">
        Please change your searching criteria.
      </Link>
    </div>
  );
};

export default EmptyState;
