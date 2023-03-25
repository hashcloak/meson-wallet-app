import { Logo } from '../Icon'
import { LogoTypes } from '../Icon/Logo'

type Props = {
  btnType?: 'button' | 'submit'
  logoType?: LogoTypes
  logoName?: string
  interact?: boolean
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
        <Logo type={logoType!} size={'xl'} interact={interact} />
        <span className='text-sm text-textBlack group-hover:text-textWhite ml-4'>{logoName}</span>
      </button>
    </>
  )
}

export default SignerWalletButton
