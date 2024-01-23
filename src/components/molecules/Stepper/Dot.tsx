import Spacer from '~/utils/Spacer';
import { StepProps } from '.';

const Dot: React.FC<StepProps> = ({ text, isActive, step }) => {
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
      <span className='text-xs font-medium text-textGray dark:text-textWhite text-center'>
        {text}
      </span>
    </div>
  );
};

export default Dot;
