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
    <div className='flex flex-col items-center'>
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

type StepType = {
  step: number
  text: string
  isLast: boolean
}

// TODO: isActive prop needs to be dynamic, retrieve maybe from the current path or change by page
const Stepper: React.FC = () => {
  const steps: StepType[] = [
    { step: 1, text: 'Connect signer wallet', isLast: false },
    { step: 2, text: 'Register account info', isLast: false },
    { step: 3, text: 'Review', isLast: false },
    { step: 4, text: 'Create wallet', isLast: true },
    { step: 1, text: 'Select wallet', isLast: false },
    { step: 2, text: 'Owner', isLast: false },
    { step: 3, text: 'Review', isLast: false },
    { step: 4, text: 'Add wallet', isLast: true },
  ]
  return (
    <div className='flex flex-col items-center'>
      <Step
        text={steps[0].text}
        isActive={true}
        step={steps[0].step}
        isLast={steps[0].isLast}
      />
      <Step
        text={steps[1].text}
        isActive={true}
        step={steps[1].step}
        isLast={steps[1].isLast}
      />
      <Step
        text={steps[2].text}
        isActive={false}
        step={steps[2].step}
        isLast={steps[2].isLast}
      />
      <Step
        text={steps[3].text}
        isActive={false}
        step={steps[3].step}
        isLast={steps[3].isLast}
      />
    </div>
  )
}

export default Stepper
