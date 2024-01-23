import { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import Button from '~/components/atoms/Button/Button';
import { Icon } from '~/components/atoms/Icon/Icon';
import { Logo, LogoTypes } from '~/components/atoms/Icon/Logo';
import { SidebarIcon } from '~/components/atoms/Icon/SidebarIcon';
import { InputControl, UnitInput } from '~/components/atoms/Input';
import { TextLoader } from '~/components/atoms/Loader';
import OptionControl from '~/components/atoms/Option/OptionControl';

import EthAddress from '~/utils/Ethereum/EthAddress';
import { mockTokens } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';
import SwitchSignerModal from '../SwitchSignerModal';
import { AdvancedParametersModal } from './AdvancedParametersModal';
import { LoadingState, resetDisabling, setDisabling } from '~/features/loading';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';
import { useGetFiatPrice } from '~/hooks';
import { getProvider } from '~/service';
import { sendTx } from '~/service/sendTx';
import { trimCurrency } from '~/utils/trimDecimal';

type SubmitDataType = {
  recipientAddress: string;
  selectedToken: string;
  sendingAmount: string | number;
};

type Props = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange?: () => void;
  recipientAddress?: string;
};

type SendFundsTxInputProps = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange: () => void;
  onSendingData: (data: SubmitDataType) => void;
  address: string;
  walletName: string;
  balance: number | string;
  recipientAddress?: string;
};

type SendFundsTxDetailsProps = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange: () => void;
  sendingData: SubmitDataType | null;
  address: string;
  walletName: string;
  balance: number | string;
  network: string;
  nonce: number;
};

export const SendFundsTxInput: React.FC<SendFundsTxInputProps> = ({
  onClose,
  onPageChange,
  onSendingData,
  address,
  walletName,
  balance,
  recipientAddress,
}) => {
  const [selectToken, setSelectToken] = useState('Eth');

  const schema = z.object({
    recipientAddress: z
      .string()
      .min(1, { message: 'Owner address is required' })
      .refine(
        (val) => {
          return ethers.utils.isAddress(val);
        },
        {
          message: 'Please input valid eth address',
        }
      ),
    sendingAmount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .nonnegative()
      .gt(0)
      .refine(
        (val) => {
          return Number(balance) >= Number(val);
        },
        {
          message: 'Amount must be more than the current balance',
        }
      ),
    selectedToken: z.string(),
  });

  const methods = useForm({
    defaultValues: {
      recipientAddress:
        recipientAddress !== undefined && recipientAddress?.length > 0
          ? recipientAddress
          : '',
      selectedToken: mockTokens[0].value,
      sendingAmount: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    onSendingData(data);
    onPageChange?.();
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  const handleSelectToken = (e: ChangeEvent<HTMLInputElement>) => {
    const currentToken = mockTokens.filter(
      (token) => token.value === e.target.value
    );
    const selectedTokenId = currentToken[0].id;
    setSelectToken(
      selectedTokenId.charAt(0).toUpperCase() + selectedTokenId.slice(1)
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);
  const [inputAddress, setInputAddress] = useState(
    recipientAddress !== undefined && recipientAddress?.length > 0
      ? recipientAddress
      : ''
  );
  const [inputAmount, setInputAmount] = useState(0);

  return (
    <div className='flex flex-col justify-center items-center text-textGray dark:text-textWhite'>
      <div>
        <span className='text-left text-xl'>Sending from</span>
        <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4'>
          <EthAddress
            ethAddress={address}
            size={4.5}
            length={'full'}
            walletName={walletName}
          />
          <Spacer size={8} axis={'vertical'} />
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
              <span className='text-textWhite rounded-lg bg-light px-2 mr-2'>Balance</span>
              <span>{balance}</span>
              <span className='ml-2'>ETH</span>
            </div>
            <button
              className='transition ease-in-out border border-main px-2 rounded-xl text-textLink hover:bg-dark hover:border-dark duration-150 hover:text-textWhite text-xs'
              type='button'
              onClick={handleIsOpen}
            >
              Switch signer
            </button>
          </div>
        </div>
        <SwitchSignerModal isOpen={isOpen} onClose={handleIsOpen} />
      </div>

      <Spacer size={16} axis={'vertical'} />
      <Icon type={'ArrowNarrowDown'} size={'5xl'} color={'white'} />
      <Spacer size={16} axis={'vertical'} />
      <div className='w-full'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <span className='text-xl'>Recipient</span>
            <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4 w-full'>
              <InputControl
                label='Recipient address'
                placeholder='0xfF0000000000000000000000000000000000*'
                type='text'
                registeredName={'recipientAddress'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInputAddress(e.target.value);
                }}
              />

              <Spacer size={8} axis={'vertical'} />

              <div className='flex flex-col'>
                <span className='text-sm text-textGrayLight'>Select Token</span>
                <div className='flex flex-row justify-center items-center'>
                  <Logo type={`${selectToken}Logo` as LogoTypes} size={'xxl'} />
                  <Spacer size={8} axis={'horizontal'} />
                  <OptionControl
                    options={mockTokens}
                    size='lg'
                    registeredName={'selectedToken'}
                    handleChange={handleSelectToken}
                  />
                </div>
              </div>

              <Spacer size={8} axis={'vertical'} />

              <UnitInput
                label='Amount you want to send'
                placeholder='Amount*'
                type='text'
                registeredName={'sendingAmount'}
                unit={selectToken.toUpperCase()}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInputAmount(Number(e.target.value));
                }}
              />
            </div>

            <Spacer size={32} axis={'vertical'} />
            <div className='flex flex-row justify-around'>
              <Button
                btnVariant={'text'}
                btnSize={'lg'}
                btnType={'button'}
                handleClick={() => {
                  onClose();
                }}
              >
                <span className='text-lg'>Cancel</span>
              </Button>
              <Button
                btnVariant={
                  inputAmount > 0 && inputAddress.length === 42
                    ? 'primary'
                    : 'disable'
                }
                btnSize={'lg'}
                btnType={'submit'}
                disabled={!(inputAmount > 0 && inputAddress.length === 42)}
              >
                Review
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

const SendFundsTxDetails: React.FC<SendFundsTxDetailsProps> = ({
  onClose,
  onPageChange,
  sendingData,
  address,
  walletName,
  network,
  balance,
  nonce,
}) => {
  const [selectToken, setSelectToken] = useState('Eth');
  const [isOpenAdvancedParamsModal, setIsOpenAdvancedParamsModal] =
    useState(false);
  const [gas, setGas] = useState('');
  const [usd, setUsd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCloseAdvancedParamsModal = () => {
    setIsOpenAdvancedParamsModal(!isOpenAdvancedParamsModal);
  };

  const {
    state: { conversionRate },
    isFetching,
  } = useGetFiatPrice();

  useEffect(() => {
    setUsd(trimCurrency(Number(sendingData?.sendingAmount) * conversionRate));
  }, [conversionRate]);

  useEffect(() => {
    const handleSelectToken = () => {
      const currentToken = mockTokens.filter(
        (token) => token.value === sendingData?.selectedToken
      );
      const selectedTokenId = currentToken[0].id;

      setSelectToken(selectedTokenId);
    };
    handleSelectToken();
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const provider = getProvider(network);
      const estimateGas = await provider.estimateGas({
        to: sendingData?.recipientAddress,
        value: ethers.utils.parseEther(String(sendingData?.sendingAmount)),
      });

      setGas(ethers.utils.formatEther(estimateGas));
    };
    void load();
    setIsLoading(false);
  }, []);

  const { chainId } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const signerWallet = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const dispatch = useDispatch();

  const handleSend = async () => {
    dispatch(setDisabling());
    setIsProcessing(true);

    try {
      if (sendingData !== null) {
        const provider = getProvider(network);
        const gasPrice = await provider.getGasPrice();

        const txParams = {
          to: sendingData.recipientAddress,
          value: ethers.utils.parseEther(sendingData.sendingAmount.toString()),
          data: '0x',
          chainId,
          gasPrice,
          nonce,
          gasLimit: 21000,
        };

        await sendTx(
          txParams,
          signerWallet,
          network,
          mesonWallet?.encryptedWallet
        );
        console.log('Tx was sent');
      }
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`error: ${error}`);

        throw new Error(error.message ?? error);
      }
    } finally {
      setIsProcessing(false);
      dispatch(resetDisabling());
      onPageChange();
      onClose();
    }
  };

  return (
    <div className='flex flex-col justify-center items-center text-textGray dark:text-textWhite'>
      <div>
        <span className='text-left text-xl'>Sending from</span>
        <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4'>
          <EthAddress
            ethAddress={address}
            size={4.5}
            length={'full'}
            walletName={walletName}
          />

          <Spacer size={8} axis={'vertical'} />
          <div className='flex flex-row items-center'>
            <span className='rounded-lg bg-light px-2 mr-2'>Balance</span>
            <span>{balance}</span>
            <span className='ml-2'>ETH</span>
          </div>
        </div>
      </div>

      <Spacer size={16} axis={'vertical'} />
      <div className='flex flex-row'>
        <Icon type={'ArrowNarrowDown'} size={'5xl'} color={'white'} />
        <div className='flex flex-row items-center'>
          <Logo
            type={
              `${
                selectToken.charAt(0).toUpperCase() + selectToken.slice(1)
              }Logo` as LogoTypes
            }
            size={'xl'}
          />
          <Spacer size={8} axis={'horizontal'} />
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <span className='text-2xl font-bold '>
                {sendingData?.sendingAmount}
              </span>
              <span className='text-2xl font-bold ml-2'>
                {selectToken.toUpperCase()}
              </span>
            </div>

            {isFetching ? (
              <TextLoader />
            ) : (
              <span className='text-textGrayLight'>≈ {usd} USD</span>
            )}
          </div>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='w-full'>
        <span className='text-xl'>Recipient</span>
        <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4 w-full'>
          <EthAddress
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ethAddress={sendingData!.recipientAddress}
            size={4.5}
            length={'full'}
          />
        </div>
        <Spacer size={16} axis={'vertical'} />

        <div className='flex flex-row justify-between'>
          <span>Transaction parameters</span>
          <button
            type='button'
            onClick={() =>
              setIsOpenAdvancedParamsModal(!isOpenAdvancedParamsModal)
            }
          >
            <SidebarIcon type={'Settings'} size={'sm'} color={'main'} />
          </button>
          <AdvancedParametersModal
            isOpen={isOpenAdvancedParamsModal}
            onClose={onCloseAdvancedParamsModal}
          />
        </div>

        <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4 w-full'>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between w-full'>
              <span>Nonce</span>
              <span>{nonce}</span>
            </div>
            <div className='flex flex-row justify-between w-full'>
              <span>TxGas</span>
              {isLoading ? <TextLoader /> : <span>{gas} ETH</span>}
            </div>
          </div>
        </div>

        <Spacer size={32} axis={'vertical'} />
        <div className='flex flex-row justify-around'>
          <Button
            btnVariant={!isProcessing ? 'text' : 'disable'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={() => onPageChange?.()}
            disabled={isProcessing}
          >
            <span className='text-lg'>Back</span>
          </Button>
          <Button
            btnVariant={!isProcessing ? 'primary' : 'disable'}
            btnSize={'lg'}
            btnType={'submit'}
            disabled={isProcessing}
            handleClick={async () => {
              await handleSend();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

const SendFundsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  recipientAddress = '',
}) => {
  const [pageChange, setPageChange] = useState(false);
  const [sendingData, setSendingData] = useState<SubmitDataType | null>(null);
  const [nonce, setNonce] = useState(0);

  const handlePageChange = () => {
    setPageChange(!pageChange);
  };

  const handleSendingData = (data: SubmitDataType) => {
    setSendingData(data);
  };

  const { walletName, mesonWallet, balance } = useSelector<
    RootState,
    MesonWalletState
  >((state) => state.mesonWallet);
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  useEffect(() => {
    const load = async () => {
      if (mesonWallet !== undefined) {
        const provider = getProvider(network);
        const currentNonce = await provider.getTransactionCount(
          // mesonWallet.smartContract
          mesonWallet.mesonWalletAddress
        );
        setNonce(currentNonce);
      }
    };
    void load();
  }, []);

  const { isDisabling } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  const handleCursor =
    isDisabling !== undefined && isDisabling
      ? 'cursor-wait pointer-events-none'
      : 'cursor-default	pointer-events-auto';

  return (
    <>
      {isOpen === true && (
        <Dialog
          open={isOpen}
          onClose={() => {
            if (!(isDisabling !== undefined && isDisabling)) {
              if (pageChange) setPageChange(false);
              setSendingData(null);
              onClose();
            }
          }}
          className={`fixed z-10 inset-0 overflow-y-auto ${handleCursor}`}
          static={isDisabling !== undefined && isDisabling}
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className={`fixed inset-0 bg-neutral-900 opacity-30 ${handleCursor}`}
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8 w-[40rem]'>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Send Funds{' '}
                {!pageChange ? (
                  <span className='text-sm text-textGrayLight'>(1/2)</span>
                ) : (
                  <span className='text-sm text-textGrayLight'>(2/2)</span>
                )}
              </span>

              {!pageChange ? (
                <SendFundsTxInput
                  isOpen={isOpen}
                  onClose={onClose}
                  onPageChange={handlePageChange}
                  onSendingData={handleSendingData}
                  recipientAddress={recipientAddress}
                  address={
                    // mesonWallet?.smartContract !== undefined
                    //   ? mesonWallet.smartContract
                    //   : ''
                    mesonWallet?.mesonWalletAddress !== undefined
                      ? mesonWallet.mesonWalletAddress
                      : ''
                  }
                  walletName={walletName !== undefined ? walletName : ''}
                  balance={balance !== undefined ? balance.eth : 0}
                />
              ) : (
                <SendFundsTxDetails
                  isOpen={isOpen}
                  onClose={onClose}
                  onPageChange={handlePageChange}
                  sendingData={sendingData}
                  address={
                    // mesonWallet?.smartContract !== undefined
                    //   ? mesonWallet.smartContract
                    //   : ''
                    mesonWallet?.mesonWalletAddress !== undefined
                      ? mesonWallet.mesonWalletAddress
                      : ''
                  }
                  walletName={walletName !== undefined ? walletName : ''}
                  balance={balance !== undefined ? balance.eth : 0}
                  nonce={nonce}
                  network={network}
                />
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SendFundsModal;
