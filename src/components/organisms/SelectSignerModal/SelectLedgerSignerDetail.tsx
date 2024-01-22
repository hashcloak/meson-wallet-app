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
import { setError } from '~/features/error';
import { ILedgerState } from '~/features/ledgerWallet';
import { LoadingState, resetLoading, setLoading } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { SignerState, SignerWalletSlice } from '~/features/signerWallet';
import { FullAccountType, getCustomLedgerAccount } from '~/service';

type SelectLedgerSignerDetailType = {
  onClose: () => void;
};

const SelectLedgerSignerDetail: React.FC<SelectLedgerSignerDetailType> = ({
  onClose,
}) => {
  const schema = z.object({
    accountNumber: z
      .string()
      .min(1, { message: 'Custom derivation path is required' }),
  });

  const methods = useForm<{ accountNumber: string }>({
    resolver: zodResolver(schema),
  });

  const [inputNumber, setInputNumber] = useState<string>('');
  const onSubmit = async (data: { accountNumber: string }) => {
    const { accountNumber } = data;
    dispatch(setLoading());
    setInputNumber(accountNumber);
    setFetchedCustomAccount([]);
    try {
      const ledgerCustomAccount: FullAccountType[] =
        await getCustomLedgerAccount(accountNumber);
      setFetchedCustomAccount(ledgerCustomAccount);
      dispatch(resetLoading({ message: '' }));
    } catch (error) {
      dispatch(resetLoading({ message: t('walletConnect.networkError') }));
      if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
      }
    }
  };

  const onError = (errors: unknown, e: unknown) =>
    console.log('Error:', errors, e);

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

  const [fiveLedgerAccounts, setFiveLedgerAccounts] = useState<
    FullAccountType[]
  >([]);

  const [fetchedCustomAccount, setFetchedCustomAccount] = useState<
    FullAccountType[]
  >([]);

  const { isLoading } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  const [primarySigner, setPrimarySigner] = useState<SignerState>({
    signerWalletAddress,
    serializedPath,
    balance,
    isConnected,
    wallet,
    publicKey,
  });

  const { ledgerAccounts } = useSelector<RootState, ILedgerState>(
    (state) => state.ledgerWallet
  );

  useEffect(() => {
    if (ledgerAccounts.length) {
      setFiveLedgerAccounts(ledgerAccounts.slice(0, 5) as FullAccountType[]);
      dispatch(resetLoading({ message: '' }));
    }
  }, [ledgerAccounts]);

  // TODO
  const handleSetNewPrimarySigner = (account: FullAccountType) => {
    const newPrimarySigner: SignerState = {
      signerWalletAddress: account.address,
      publicKey: (account.publicKey ?? '') || '',
      serializedPath: account.serializedPath,
      balance: account.balance,
      isConnected: true,
      wallet: 'Ledger',
    };
    setPrimarySigner(newPrimarySigner);
    dispatch(resetLoading({ message: t('walletConnect.success') }));
  };

  const handleSelect = () => {
    console.log('Select signer to: ', primarySigner);
    dispatch(setSignerWallet(primarySigner));
    onClose();
  };

  const handlePageChange = (page: number) => {
    switch (page) {
      case 1:
        setFiveLedgerAccounts(ledgerAccounts.slice(0, 5) as FullAccountType[]);
        break;
      case 2:
        setFiveLedgerAccounts(ledgerAccounts.slice(5, 10) as FullAccountType[]);
        break;
      case 3:
        setFiveLedgerAccounts(
          ledgerAccounts.slice(10, 15) as FullAccountType[]
        );
        break;
      case 4:
        setFiveLedgerAccounts(
          ledgerAccounts.slice(15, 20) as FullAccountType[]
        );
        break;
      case 5:
        setFiveLedgerAccounts(
          ledgerAccounts.slice(20, 25) as FullAccountType[]
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex flex-col text-textGray dark:text-textWhite'>
      <span className='text-lg'>Select account# (Option)</span>
      <div className=' bg-bgGrayLight  dark:bg-bgDarkLight p-4 rounded-2xl'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className='flex gap-8 items-end justify-center'>
              <InputControl
                label='account#'
                placeholder='0'
                type='text'
                registeredName={'accountNumber'}
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
      <div className='bg-bgGrayLight  dark:bg-bgDarkLight p-4 rounded-2xl flex flex-col w-[928px]'>
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
            {fetchedCustomAccount.length ? (
              <>
                {fetchedCustomAccount.map((account: FullAccountType) => (
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
                      <span className='col-span-1'>{inputNumber}</span>
                      <span className='col-span-2'>{account.balance} ETH</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {fiveLedgerAccounts?.map((account: FullAccountType) => (
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
                      <span className='col-span-1'>
                        {ledgerAccounts.findIndex(
                          (fullAcc) => fullAcc.address === account.address
                        )}
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

export default SelectLedgerSignerDetail;
