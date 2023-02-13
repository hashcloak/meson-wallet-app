import { Logo, LogoTypes } from '../Icon/Logo'

import Spacer from '~/utils/Spacer'

type Props = {
  btnType: 'button' | 'submit'
  logoType: LogoTypes
  logoName: string
  interact: boolean
  handleClick?: () => void
}

const SignerWalletButton: React.FC<Props> = ({
  btnType,
  logoType,
  logoName,
  interact,
  handleClick,
}) => {
  return (
    <>
      <button
        type={btnType}
        className='flex flex-row items-center w-48 h-12 px-6 py-2 rounded-xl bg-bgGrayMid hover:bg-dark group'
        onClick={handleClick}
      >
        <Logo type={logoType} size={'xl'} interact={interact} />
        <Spacer size={16} axis={'horizontal'} />
        <span className='text-sm text-textBlack group-hover:text-textWhite'>
          {logoName}
        </span>
      </button>
    </>
  )
}

export default SignerWalletButton
