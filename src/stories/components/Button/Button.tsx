import { theme } from '../../utils/theme'

type Props = {
  btnVariant:
    | 'primary'
    | 'warning'
    | 'text'
    | 'disable'
    | 'borderDark'
    | 'borderLight'
    | 'specialDark'

  btnSize: 'sm' | 'md' | 'lg' | 'sp'
  btnType: 'button' | 'submit'
  disabled?: boolean
  handleClick?: () => void
  children: React.ReactNode
}

const Button: React.FC<Props> = ({
  btnVariant,
  btnSize,
  btnType,
  disabled = false,
  handleClick,
  children,
}) => {
  const { variants, sizes } = theme.buttons

  const btnStyle = `rounded-xl text-center font-bold	text-sm	 ${variants[btnVariant]} ${sizes[btnSize]}`

  return (
    <button
      type={btnType}
      className={btnStyle}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
