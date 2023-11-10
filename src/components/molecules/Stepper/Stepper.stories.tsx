import Stepper from '.';

export default {
  title: 'Components/Molecules/Stepper',
  component: 'Stepper',
};

export const Default: React.FC = (): React.ReactElement => (
  <Stepper isCreateNew={false} currentStep={0} />
);
