import React from 'react';

import ViewOn from '.';

export default {
  title: 'Utils/ViewOn',
  component: ViewOn,
  parameters: {
    componentSubtitle: 'View on etherscan',
  },
};

export const Default: React.FC = (): React.ReactElement => (
  <ViewOn address='0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7' />
);
