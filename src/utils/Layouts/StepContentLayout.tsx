import React from 'react';

type Props = {
  isBtn?: boolean;
  cols?: string;
  gap?: string;
  children: React.ReactNode;
};

const StepContentLayout: React.FC<Props> = ({
  isBtn = false,
  cols = '2',
  gap = '7',
  children,
}) => {
  const contentStyle = isBtn
    ? 'flex items-center justify-around gap-8 rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid box-border py-4 px-8 text-textGray dark:text-textWhite'
    : `grid grid-cols-${cols} gap-[${gap}rem] rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid box-border py-4 px-8 text-textGray dark:text-textWhite`;

  return <div className={contentStyle}>{children}</div>;
};

export default StepContentLayout;
