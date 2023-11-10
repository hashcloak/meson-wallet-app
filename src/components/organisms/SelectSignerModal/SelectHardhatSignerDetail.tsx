/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '~/components/atoms/Button';
import Spinner from '~/components/atoms/Spinner';
import Spacer from '~/utils/Spacer';
import { setError } from '~/features/error';
import { LoadingState, resetLoading, setLoading } from '~/features/loading';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { SignerState, SignerWalletSlice } from '~/features/signerWallet';

type SelectHardhatSignerDetailType = {
  onClose: () => void;
};

export type HHAccountType = {
  account: string;
  address: string;
  privateKey: string;
  balance: string;
};
const hardhatAccounts: HHAccountType[] = [
  {
    account: '1',
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    balance: '10000',
  },
  {
    account: '2',
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    privateKey:
      '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    balance: '10000',
  },
  {
    account: '3',
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    privateKey:
      '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    balance: '10000',
  },
  {
    account: '4',
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    privateKey:
      '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
    balance: '10000',
  },
  {
    account: '5',
    address: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    privateKey:
      '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
    balance: '10000',
  },
  {
    account: '6',
    address: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    privateKey:
      '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba',
    balance: '10000',
  },
  {
    account: '7',
    address: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
    privateKey:
      '0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e',
    balance: '10000',
  },
  {
    account: '8',
    address: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
    privateKey:
      '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356',
    balance: '10000',
  },
  {
    account: '9',
    address: '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
    privateKey:
      '0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97',
    balance: '10000',
  },
  {
    account: '10',
    address: '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
    privateKey:
      '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6',
    balance: '10000',
  },
];

const SelectHardhatSignerDetail: React.FC<SelectHardhatSignerDetailType> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { setSignerWallet } = SignerWalletSlice.actions;

  const {
    signerWalletAddress,
    publicKey,
    serializedPath,
    balance,
    isConnected,
    wallet,
  } = useSelector<RootState, SignerState>((state) => state.signerWallet);

  const { isLoading } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  const [primarySigner, setPrimarySigner] = useState<SignerState>({
    signerWalletAddress,
    serializedPath,
    balance,
    isConnected,
    wallet,
    publicKey,
  });

  useEffect(() => {
    dispatch(resetLoading({ message: '' }));
  }, []);

  // TODO
  const handleSetNewPrimarySigner = (account: HHAccountType) => {
    const newPrimarySigner: SignerState = {
      signerWalletAddress: account.address,
      balance: account.balance,
      isConnected: true,
      wallet: 'Hardhat',
      publicKey: account.privateKey,
    };
    setPrimarySigner(newPrimarySigner);
    dispatch(resetLoading({ message: t('walletConnect.success') }));
  };

  const handleSelect = () => {
    dispatch(setSignerWallet(primarySigner));

    dispatch(setLoading());
    try {
      dispatch(resetLoading({ message: '' }));
    } catch (error) {
      dispatch(resetLoading({ message: t('walletConnect.networkError') }));
      if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
      }
    }
    onClose();
  };

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Available signers</span>
      <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col w-[928px]'>
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
                <span className='col-span-1'>Account#</span>
                <span className='col-span-2'>Asset</span>
              </div>
            </div>
            {network === 'localhost' ? (
              <>
                {hardhatAccounts.map((account) => (
                  <div
                    className={`transition ease-in-out grid grid-cols-2 gap-x-8 box-border rounded-xl hover:bg-dark w-full p-2 ${
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
                      <span className='col-span-1'>{account.account}</span>
                      <span className='col-span-2'>{account.balance} ETH</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className='flex w-full h-full justify-center items-center'>
                <span>Please select Localhost in network selector</span>
              </div>
            )}
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
          handleClick={handleSelect}
          disabled={primarySigner.signerWalletAddress === signerWalletAddress}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};

export default SelectHardhatSignerDetail;
