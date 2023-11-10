import Step from './Step';

export type StepProps = {
  text: string;
  isActive: boolean;
  step: number;
  isLast?: boolean;
};

type StepperPropsType = {
  isCreateNew: boolean;
  currentStep: number;
};

// TODO: isActive prop needs to be dynamic, retrieve maybe from the current path or change by page
const Stepper: React.FC<StepperPropsType> = ({
  isCreateNew = true,
  currentStep = 0,
}) => {
  const createNewSteps = [
    { step: 1, text: 'Connect signer wallet', isLast: false },
    { step: 2, text: 'Register account info', isLast: false },
    { step: 3, text: 'Review', isLast: false },
    { step: 4, text: 'Create wallet', isLast: true },
  ];

  const addExistingSteps = [
    { step: 1, text: 'Select wallet', isLast: false },
    { step: 2, text: 'Owner', isLast: false },
    { step: 3, text: 'Review', isLast: true },
  ];

  const stepper = isCreateNew
    ? createNewSteps.map((step, index) => (
        <Step
          text={step.text}
          isActive={index === currentStep}
          step={step.step}
          isLast={step.isLast}
          key={step.text}
        />
      ))
    : addExistingSteps.map((step, index) => (
        <Step
          text={step.text}
          isActive={index === currentStep}
          step={step.step}
          isLast={step.isLast}
          key={step.text}
        />
      ));

  return (
    <div className='flex flex-col items-center h-16 max-w-[5rem] max-h-16 '>
      {stepper}
    </div>
  );
};

export default Stepper;
