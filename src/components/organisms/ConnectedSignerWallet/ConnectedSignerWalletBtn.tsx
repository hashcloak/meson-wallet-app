import { Logo } from '~/components/atoms/Icon';
import { LogoTypes } from '~/components/atoms/Icon/Logo';
import { EthAddress } from '~/utils/Ethereum';
import Spacer from '~/utils/Spacer';
import {
  ConnectedSignerWalletProps,
  signerWallets,
} from './ConnectedSignerWallet';
import NoSignerWalletBtn from './NoSignerWalletBtn';

// TODO: This needs to be dynamically change based on the props
const ConnectedSignerWalletBtn: React.FC<ConnectedSignerWalletProps> = ({
  ethAddress = '',
  isConnected,
  signerWallet,
  network,
}) => {
  const selectedSignerWallet = Object.values(signerWallets).filter(
    (wallet) => Object.values(wallet)[0].toString() === signerWallet
  ) as unknown as string;

  return (
    <>
      {isConnected && ethAddress.length ? (
        <div className='flex flex-row items-center min-w-[14rem]'>
          <Logo
            type={Object.keys(selectedSignerWallet[0])[0] as LogoTypes}
            size={'xl'}
          />
          <Spacer size={8} axis={'horizontal'} />
          <div className='flex flex-col items-start'>
            <span className='text-textGray dark:text-textWhite text-sm font-bold'>
              {Object.values(selectedSignerWallet[0])} @ {network}
            </span>
            <div className='flex flex-row items-center'>
              <EthAddress
                ethAddress={ethAddress}
                size={2}
                length={'short'}
                icons={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <NoSignerWalletBtn />
      )}
    </>
  );
};

export default ConnectedSignerWalletBtn;
