/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { EthereumAddress } from 'trezor-connect';
import { Button } from '~/components/atoms/Button';
import Spinner from '~/components/atoms/Spinner';
import Spacer from '~/utils/Spacer';
import { RootState } from '~/features/reducers';
import { SignerState, SignerWalletSlice } from '~/features/signerWallet';
import { ITrezorState } from '~/features/trezorWallet';

type SwitchSignerDetailType = {
  onClose: () => void;
};

type NewTrezorAccountType = {
  address: string;
  serializedPath: string;
  balance: string;
};

const SwitchSignerDetail: React.FC<SwitchSignerDetailType> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { setSignerWallet } = SignerWalletSlice.actions;

  const trezorAccounts = useSelector<RootState, ITrezorState>(
    (state) => state.trezorWallet
  );
  const { signerWalletAddress, serializedPath, balance, isConnected, wallet } =
    useSelector<RootState, SignerState>((state) => state.signerWallet);

  const [trezorFullAccounts, setTrezorAccountsWithBalance] = useState<
    NewTrezorAccountType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [primarySigner, setPrimarySigner] = useState<SignerState>({
    signerWalletAddress,
    serializedPath,
    balance,
    isConnected,
    wallet,
  });

  useEffect(() => {
    setIsLoading(!isLoading);

    const data = async () => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!trezorAccounts) {
        setIsLoading(!isLoading);
        onClose();

        return;
      }
      const network = 'mainnet';
      const provider = ethers.getDefaultProvider(network, {
        etherscan: import.meta.env.VITE_ETHERSCAN_API_KEY,
      });

      const updateAccounts = await Promise.all(
        trezorAccounts.trezorAccounts.map(async (account: EthereumAddress) => {
          const balance = await provider.getBalance(account.address);
          const balanceInEth = ethers.utils.formatEther(balance);
          const fullAccount = {
            serializedPath: account.serializedPath,
            address: account.address,
            balance: balanceInEth,
          };

          return fullAccount;
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setTrezorAccountsWithBalance(updateAccounts);
      setIsLoading(false);
    };
    void data();
  }, []);

  // TODO
  const handleSetNewPrimarySigner = (account: any) => {
    const newPrimarySigner: SignerState = {
      signerWalletAddress: account.address,
      serializedPath: account.serializedPath,
      balance: account.balance,
      isConnected: true,
      wallet: 'Trezor',
    };
    setPrimarySigner(newPrimarySigner);
  };

  const handleSwitch = () => {
    console.log('Switch signer to: ', primarySigner);
    dispatch(setSignerWallet(primarySigner));
    onClose();
  };

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Current signer</span>
      <div className=' bg-bgDarkLight p-4 rounded-2xl'>
        <div className='grid grid-cols-2 gap-x-8 box-border w-full p-2'>
          <div className='grid grid-cols-1 text-textGrayLight'>
            <span className='col-span-1'>Address</span>
          </div>
          <div className='grid grid-cols-3 gap-x-8 text-textGrayLight'>
            <span className='col-span-1'>Path</span>
            <span className='col-span-2'>Asset</span>
          </div>

          <div className='grid grid-cols-1'>
            <span className='col-span-1'>{signerWalletAddress}</span>
          </div>
          <div className='grid grid-cols-3 gap-x-8'>
            <span className='col-span-1'>{serializedPath}</span>
            <span className='col-span-2'>{balance}</span>
          </div>
        </div>
      </div>

      <Spacer size={32} axis={'vertical'} />

      <span className='text-lg'>Available signers</span>
      <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
        {isLoading ? (
          <div className='w-full h-full self-center'>
            <Spinner />
          </div>
        ) : (
          <div className='box-border w-full'>
            <div className='grid grid-cols-2 gap-x-8 box-border w-full px-2'>
              <div className='grid grid-cols-1 text-textGrayLight'>
                <span className='col-span-1'>Address</span>
              </div>
              <div className='grid grid-cols-3 gap-x-8 text-textGrayLight'>
                <span className='col-span-1'>Path</span>
                <span className='col-span-2'>Asset</span>
              </div>
            </div>

            {trezorFullAccounts?.map((account: any) => (
              <div
                className={`grid grid-cols-2 gap-x-8 box-border rounded-xl hover:bg-dark w-full p-2 ${
                  account.address === primarySigner.signerWalletAddress
                    ? 'bg-dark'
                    : ''
                }`}
                key={account.address}
                onClick={() => handleSetNewPrimarySigner(account)}
                role='button'
              >
                <div className='grid grid-cols-1'>
                  <span className='col-span-1'>{account.address}</span>
                </div>
                <div className='grid grid-cols-3 gap-x-8'>
                  <span className='col-span-1'>{account.serializedPath}</span>
                  <span className='col-span-2'>{account.balance} ETH</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Spacer size={32} axis={'vertical'} />
      <div className='flex flex-row justify-around'>
        <Button
          btnVariant={'text'}
          btnSize={'lg'}
          btnType={'button'}
          handleClick={onClose}
        >
          <span className='text-lg'>Cancel</span>
        </Button>
        <Button
          btnVariant={
            primarySigner.signerWalletAddress === signerWalletAddress
              ? 'disable'
              : 'primary'
          }
          btnSize={'lg'}
          btnType={'submit'}
          handleClick={handleSwitch}
          disabled={primarySigner.signerWalletAddress === signerWalletAddress}
        >
          Switch
        </Button>
      </div>
    </div>
  );
};

export default SwitchSignerDetail;
