import React from 'react';
import SelectMesonWallet from '~/components/templates/SelectMesonWallet';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import { BaseLayout } from '~/utils/Layouts';

const AddExistingStep1: React.FC = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={false} currentStep={0} />}
      body={<SelectMesonWallet />}
    />
  );
};

export default AddExistingStep1;
