import { theme } from '~/utils/theme';

type Props = {
  btnVariant?: 'primary' | 'alert' | 'text' | 'disable' | 'border' | 'special';
  btnSize?: 'sm' | 'md' | 'lg' | 'sp';
  btnType?: 'button' | 'submit';
  disabled?: boolean;
  handleClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  btnVariant = 'primary',
  btnSize = 'lg',
  btnType = 'button',
  disabled = false,
  handleClick = () => console.log('clicked'),
  children,
}) => {
  const { variants, sizes } = theme.buttons;

  return (
    <button
      type={btnType}
      className={`flex justify-center items-center rounded-xl text-center font-bold	text-sm	 ${variants[btnVariant]} ${sizes[btnSize]}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
