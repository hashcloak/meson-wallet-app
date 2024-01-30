/* eslint-disable @typescript-eslint/ban-types */
import React, { FC } from 'react';

type Props = {
  size: number;
  axis: string;
  style?: {};
};

const Spacer: FC<Props> = ({ size, axis, style = {}, ...delegated }) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;

  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...delegated}
    />
  );
};
export default Spacer;
