import { Logo } from '../Icon';
import { LogoTypes } from '../Icon/Logo';

type Props = {
  btnType?: 'button' | 'submit';
  logoType?: LogoTypes;
  logoName?: string;
  interact?: boolean;
  handleConnect?: () => void;
};

const SignerWalletButton: React.FC<Props> = ({
  btnType,
  logoType,
  logoName,
  interact,
  handleConnect,
}) => {
  return (
    <>
      <button
        type={btnType}
        className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
        onClick={handleConnect}
      >
        <Logo type={logoType as LogoTypes} size={'xl'} interact={interact} />
        <span className='text-sm text-textBlack group-hover:text-textWhite ml-4'>
          {logoName}
        </span>
      </button>
    </>
  );
};

export default SignerWalletButton;
