import React, { FC } from 'react';

interface SingleRidePageProps {
  params: {
    slug: string;
  };
}

const SingleRidePage = ({ params: { slug } }: SingleRidePageProps) => {
  return <div className="pt-52">{slug}</div>;
};

export default SingleRidePage;
