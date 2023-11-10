import React from 'react';

type Props = {
  url: string;
  size: 'xs' | 'sm' | 'base' | 'md' | 'lg';
  children: React.ReactNode;
};
const CustomLink: React.FC<Props> = ({ url, size, children }) => {
  return (
    <a
      href={url}
      className={`text-textLink hover:text-dark text-${size}`}
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  );
};

export default CustomLink;
