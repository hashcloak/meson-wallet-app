/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '~/components/atoms/Button';
import { InputControl } from '~/components/atoms/Input';
import Spinner from '~/components/atoms/Spinner';
import Spacer from '~/utils/Spacer';
import Pagination from './Pagination';
import { LoadingState, resetLoading, setLoading } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState, SignerWalletSlice } from '~/features/signerWallet';
import { ITrezorState } from '~/features/trezorWallet';
import { FullAccountType, getCustomTrezorAccount } from '~/service';

type SelectTrezorSignerDetailType = {
  onClose: () => void;
};

const SelectTrezorSignerDetail: React.FC<SelectTrezorSignerDetailType> = ({
  onClose,
}) => {
  const schema = z.object({
    customPath: z
      .string()
      .min(1, { message: 'Custom derivation path is required' }),
  });

  const methods = useForm<{ customPath: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { customPath: string }) => {
    dispatch(setLoading());
    setFetchedCustomAccount([]);
    try {
      const customAccount = await getCustomTrezorAccount(data.customPath);
      setFetchedCustomAccount(customAccount);
      dispatch(resetLoading({ message: '' }));
    } catch (error) {
      dispatch(resetLoading({ message: t('walletConnect.networkError') }));
      throw new Error('Something went wrong. Please retry');
    }
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  const { setSignerWallet } = SignerWalletSlice.actions;

  const {
    signerWalletAddress,
    publicKey,
    serializedPath,
    balance,
    isConnected,
    wallet,
  } = useSelector<RootState, SignerState>((state) => state.signerWallet);

  const { trezorAccounts } = useSelector<RootState, ITrezorState>(
    (state) => state.trezorWallet
  );
  const { isLoading } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  const [fiveTrezorAccounts, setFiveTrezorAccounts] = useState<
    FullAccountType[]
  >([]);

  const [fetchedCustomAccount, setFetchedCustomAccount] = useState<
    FullAccountType[]
  >([]);

  const [primarySigner, setPrimarySigner] = useState<SignerState>({
    signerWalletAddress,
    serializedPath,
    balance,
    isConnected,
    wallet,
    publicKey,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (trezorAccounts.length) {
      setFiveTrezorAccounts(trezorAccounts.slice(0, 5) as FullAccountType[]);
      dispatch(resetLoading({ message: '' }));
    }
  }, [trezorAccounts]);

  // TODO
  const handleSetNewPrimarySigner = (account: FullAccountType) => {
    const newPrimarySigner: SignerState = {
      signerWalletAddress: account.address,
      publicKey: account.publicKey as string,
      serializedPath: account.serializedPath,
      balance: account.balance,
      isConnected: true,
      wallet: 'Trezor',
    };
    dispatch(setSignerWallet(primarySigner));

    setPrimarySigner(newPrimarySigner);
  };

  const handleSelect = () => {
    console.log('Select signer to: ', primarySigner);
    dispatch(setSignerWallet(primarySigner));
    onClose();
  };

  const handlePageChange = (page: number) => {
    switch (page) {
      case 1:
        setFiveTrezorAccounts(trezorAccounts.slice(0, 5) as FullAccountType[]);
        break;
      case 2:
        setFiveTrezorAccounts(trezorAccounts.slice(5, 10) as FullAccountType[]);
        break;
      case 3:
        setFiveTrezorAccounts(
          trezorAccounts.slice(10, 15) as FullAccountType[]
        );
        break;
      case 4:
        setFiveTrezorAccounts(
          trezorAccounts.slice(15, 20) as FullAccountType[]
        );
        break;
      case 5:
        setFiveTrezorAccounts(
          trezorAccounts.slice(20, 25) as FullAccountType[]
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Select Base Path (Option)</span>
      <div className=' bg-bgDarkLight p-4 rounded-2xl'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className='flex gap-8 items-end justify-center'>
              <InputControl
                label='Custom path'
                placeholder="m/44'/60'/0'/0'"
                type='text'
                registeredName={'customPath'}
              />
              <button
                className='transition ease-in-out border border-main px-2 rounded-xl h-10 w-20 text-textLink hover:bg-dark hover:border-dark duration-150 hover:text-textWhite text-xs'
                type='submit'
              >
                Import
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      <Spacer size={32} axis={'vertical'} />

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
                <span className='col-span-1'>Path</span>
                <span className='col-span-2'>Asset</span>
              </div>
            </div>
            {fetchedCustomAccount.length ? (
              <>
                {fetchedCustomAccount.map((account: FullAccountType) => (
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
                      <span className='col-span-1'>
                        {account.serializedPath}
                      </span>
                      <span className='col-span-2'>{account.balance} ETH</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {fiveTrezorAccounts?.map((account: FullAccountType) => (
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
                      <span className='col-span-1'>
                        {account.serializedPath}
                      </span>
                      <span className='col-span-2'>{account.balance} ETH</span>
                    </div>
                  </div>
                ))}
                <Pagination
                  sum={25}
                  per={5}
                  onPageChange={(e) => handlePageChange(e.page)}
                />
              </>
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

export default SelectTrezorSignerDetail;
