import React from 'react';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import WalletReview from '~/components/templates/WalletReview';
import { BaseLayout } from '~/utils/Layouts';

const Step3: React.FC = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={false} currentStep={2} />}
      body={<WalletReview isCreateNew={false} />}
    />
  );
};

export default Step3;
