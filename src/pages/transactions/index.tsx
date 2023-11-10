import React from 'react';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import TxsContents from '~/components/templates/TxsContents';
import { BaseLayout } from '~/utils/Layouts';

const Transactions: React.FC = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={false} />}
      body={<TxsContents />}
    />
  );
};

export default Transactions;
