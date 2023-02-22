import VerticalBar from './images/VerticalBar'

import Spacer from '~/utils/Spacer'

type Props = {
  text: string
  isActive: boolean
  step: number
  isLast?: boolean
}

const Dot: React.FC<Props> = ({ text, isActive, step }) => {
  return (
    <div className='flex flex-col items-center w-full'>
      <div
        className={`rounded-full flex item-center justify-center w-8 h-8 ${
          isActive ? 'bg-main' : 'bg-bgGray'
        }`}
      >
        <span
          className={`mt-1 ${isActive ? 'text-textWhite' : 'text-textBlack'}`}
        >
          {step}
        </span>
      </div>
      <Spacer size={4} axis={'vertical'} />
      <span className='text-xs font-medium text-textWhite text-center'>
        {text}
      </span>
    </div>
  )
}

const Step: React.FC<Props> = ({ text, isActive, step, isLast }) => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Dot text={text} isActive={isActive} step={step} />
      {isLast ? null : (
        <>
          {/* <Spacer size={8} axis={'vertical'} /> */}
          <VerticalBar isActive={isActive} />
          {/* <Spacer size={8} axis={'vertical'} /> */}
        </>
      )}
    </div>
  )
}

type StepperPropsType = {
  isCreateNew: boolean
  currentStep: number
}

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
  ]

  const addExistingSteps = [
    { step: 1, text: 'Select wallet', isLast: false },
    { step: 2, text: 'Owner', isLast: false },
    { step: 3, text: 'Review', isLast: true },
  ]

  const stepper = isCreateNew
    ? createNewSteps.map((step, index) => (
        <>
          <Step
            text={step.text}
            isActive={index === currentStep ? true : false}
            step={step.step}
            isLast={step.isLast}
            key={index}
          />
        </>
      ))
    : addExistingSteps.map((step, index) => (
        <>
          <Step
            text={step.text}
            isActive={index === currentStep ? true : false}
            step={step.step}
            isLast={step.isLast}
            key={index}
          />
        </>
      ))

  return (
    <div className='flex flex-col items-center h-16 max-w-[5rem] max-h-16 '>
      {stepper}
    </div>
  )
}

export default Stepper
