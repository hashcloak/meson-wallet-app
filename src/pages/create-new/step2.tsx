import React from 'react';
import RegisterAccountInfo from '~/components/templates/RegisterAccountInfo';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import { BaseLayout } from '~/utils/Layouts';

const Step2: React.FC = () => {
  return (
    <BaseLayout
      topbar={<Topbar />}
      sidebar={<Sidebar isStepper={true} isCreateNew={true} currentStep={1} />}
      body={<RegisterAccountInfo />}
    />
  );
};

export default Step2;
