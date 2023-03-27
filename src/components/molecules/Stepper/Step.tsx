import Dot from './Dot'
import VerticalBar from './images/VerticalBar'
import { StepProps } from '.'

const Step: React.FC<StepProps> = ({ text, isActive, step, isLast }) => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Dot text={text} isActive={isActive} step={step} />
      {isLast ? null : (
        <>
          <VerticalBar isActive={isActive} />
        </>
      )}
    </div>
  )
}

export default Step
