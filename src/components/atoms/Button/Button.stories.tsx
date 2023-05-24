/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { action } from '@storybook/addon-actions';
import { Wallet } from 'ethers';
import { MockWagmiDecorator } from '../../../../.storybook/decorators';
import { LogoTypes } from '../Icon/Logo';
import WalletConnectButton from './WalletConnectButton';
import { Button, SignerWalletButton, TrezorButton } from '.';
import { supportedSignerWallets } from '~/utils/supportedSignerWallets';
import { theme } from '~/utils/theme';

const demoWallet = new Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
);

export default {
  title: 'Components/Atmos/Button',
  component: { Button, SignerWalletButton },
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [MockWagmiDecorator(demoWallet)],
};

export const Default: React.FC = (): React.ReactElement => {
  const variants = Object.keys(theme.buttons.variants);

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full'>
        {variants.map((variant: any) => (
          <div key={variant} className='m-4'>
            <Button
              btnType='button'
              btnVariant={variant}
              btnSize='sm'
              disabled={variant === 'disable'}
              handleClick={action('clicked')}
            >
              Submit
            </Button>
          </div>
        ))}
      </div>
      <div className='flex flex-row flex-wrap w-full'>
        {variants.map((variant: any) => (
          <div key={variant} className='m-4'>
            <Button
              btnType='button'
              btnVariant={variant}
              btnSize='md'
              disabled={variant === 'disable'}
            >
              Submit
            </Button>
          </div>
        ))}
      </div>
      <div className='flex flex-row flex-wrap w-full'>
        {variants.map((variant: any) => (
          <div key={variant} className='m-4'>
            <Button
              btnType='button'
              btnVariant={variant}
              btnSize='lg'
              disabled={variant === 'disable'}
            >
              Submit
            </Button>
          </div>
        ))}
      </div>
      <div className='flex flex-row flex-wrap w-full'>
        <div className='m-4'>
          <Button
            btnType='button'
            btnVariant='special'
            btnSize='sp'
            disabled={true}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SignerWalletButtons = (): React.ReactElement => {
  return (
    <>
      {supportedSignerWallets.map((wallet) => (
        <SignerWalletButton
          btnType={'button'}
          logoType={Object.keys(wallet)[0] as LogoTypes}
          logoName={Object.values(wallet)[0]}
          interact={true}
          key={Object.keys(wallet)[0]}
        />
      ))}
    </>
  );
};

export const WalletConnectConnector = (): React.ReactElement => {
  return <WalletConnectButton />;
};

export const TrezorConnector = (): React.ReactElement => {
  return <TrezorButton />;
};
