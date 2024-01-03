import React, { FC } from 'react';

interface HeadingProps {
  heading: string;
  subheading?: string;
}

const Heading: FC<HeadingProps> = ({ heading, subheading }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <h2 className="font-4xl font-semibold">{heading}</h2>
      {subheading && (
        <p className="text-muted-foreground text-sm">{subheading}</p>
      )}
    </div>
  );
};

export default Heading;
