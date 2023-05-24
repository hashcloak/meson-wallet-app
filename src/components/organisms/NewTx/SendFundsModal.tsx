import { ChangeEvent, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '~/components/atoms/Button/Button';
import { Icon } from '~/components/atoms/Icon/Icon';
import { Logo, LogoTypes } from '~/components/atoms/Icon/Logo';
import { SidebarIcon } from '~/components/atoms/Icon/SidebarIcon';
import { InputControl, UnitInput } from '~/components/atoms/Input';
import OptionControl from '~/components/atoms/Option/OptionControl';

import EthAddress from '~/utils/Ethereum/EthAddress';
import { mockTokens } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';
import SwitchSignerModal from '../SwitchSignerModal';
import { AdvancedParametersModal } from './AdvancedParametersModal';

type SubmitDataType = {
  recipientAddress: string;
  selectedToken: string;
  sendingAmount: string | number;
};

type Props = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange?: () => void;
  address?: string;
};

type SendFundsTxInputProps = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange: () => void;
  onSendingData: (data: SubmitDataType) => void;
  address?: string;
};

type SendFundsTxDetailsProps = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange: () => void;
  sendingData: SubmitDataType | null;
};

export const SendFundsTxInput: React.FC<SendFundsTxInputProps> = ({
  onClose,
  onPageChange,
  onSendingData,
  address = '',
}) => {
  const ethAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7';
  const [selectToken, setSelectToken] = useState('Eth');

  const schema = z.object({
    recipientAddress: z
      .string()
      .min(1, { message: 'Owner address is required' }),
    sendingAmount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .nonnegative()
      .gt(0),
    selectedToken: z.string(),
  });

  const methods = useForm({
    defaultValues: {
      recipientAddress: address,
      selectedToken: mockTokens[0].value,
      sendingAmount: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
    console.log(
      selectedTokenId.charAt(0).toUpperCase() + selectedTokenId.slice(1)
    );
    setSelectToken(
      selectedTokenId.charAt(0).toUpperCase() + selectedTokenId.slice(1)
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className='flex flex-col justify-center items-center text-textWhite'>
      <div>
        <span className='text-left text-xl'>Sending from</span>
        <div className='rounded-2xl bg-bgDarkLight p-4'>
          <EthAddress
            ethAddress={ethAddress}
            size={4.5}
            length={'full'}
            walletName={'My wallet'}
          />
          <Spacer size={8} axis={'vertical'} />
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center'>
              <span className='rounded-lg bg-light px-2 mr-2'>Balance</span>
              <span>0.080</span>
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
            <div className='rounded-2xl bg-bgDarkLight p-4 w-full'>
              <InputControl
                label='Recipient address'
                placeholder='0xfF0000000000000000000000000000000000*'
                type='text'
                registeredName={'recipientAddress'}
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
              <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
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
}) => {
  const ethAddress = '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7';
  const [selectToken, setSelectToken] = useState('Eth');
  const [isOpenAdvancedParamsModal, setIsOpenAdvancedParamsModal] =
    useState(false);

  const onCloseAdvancedParamsModal = () => {
    setIsOpenAdvancedParamsModal(!isOpenAdvancedParamsModal);
  };

  useEffect(() => {
    const handleSelectToken = () => {
      const currentToken = mockTokens.filter(
        (token) => token.value === sendingData?.selectedToken
      );
      const selectedTokenId = currentToken[0].id;

      setSelectToken(selectedTokenId);
    };
    handleSelectToken();
  });

  return (
    <div className='flex flex-col justify-center items-center text-textWhite'>
      <div>
        <span className='text-left text-xl'>Sending from</span>
        <div className='rounded-2xl bg-bgDarkLight p-4'>
          <EthAddress
            ethAddress={ethAddress}
            size={4.5}
            length={'full'}
            walletName={'My wallet'}
          />

          <Spacer size={8} axis={'vertical'} />
          <div className='flex flex-row items-center'>
            <span className='rounded-lg bg-light px-2 mr-2'>Balance</span>
            <span>0.080</span>
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
            <span className='text-sm text-textGrayLight'>≈ 10.00 USD</span>
          </div>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div className='w-full'>
        <span className='text-xl'>Recipient</span>
        <div className='rounded-2xl bg-bgDarkLight p-4 w-full'>
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

        <div className='rounded-2xl bg-bgDarkLight p-4 w-full'>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between w-full'>
              <span>Nonce</span>
              <span>33</span>
            </div>
            <div className='flex flex-row justify-between w-full'>
              <span>TxGas</span>
              <span>43634</span>
            </div>
          </div>
        </div>

        <Spacer size={32} axis={'vertical'} />
        <div className='flex flex-row justify-around'>
          <Button
            btnVariant={'text'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={() => onPageChange?.()}
          >
            <span className='text-lg'>Back</span>
          </Button>
          <Button
            btnVariant={'primary'}
            btnSize={'lg'}
            btnType={'submit'}
            handleClick={onClose}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

const SendFundsModal: React.FC<Props> = ({ isOpen, onClose, address }) => {
  const [pageChange, setPageChange] = useState(false);
  const [sendingData, setSendingData] = useState<SubmitDataType | null>(null);

  const handlePageChange = () => {
    setPageChange(!pageChange);
  };

  const handleSendingData = (data: SubmitDataType) => {
    setSendingData(data);
  };

  return (
    <>
      {isOpen === true && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8 w-[40rem]'>
              <span className='text-textWhite text-2xl font-bold'>
                Send Funds{' '}
                {!pageChange ? (
                  <span className='text-sm text-textGrayLight'>(1/2)</span>
                ) : (
                  <span className='text-sm text-textGrayLight'>(2/2)</span>
                )}
              </span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                {!pageChange ? (
                  <SendFundsTxInput
                    isOpen={isOpen}
                    onClose={onClose}
                    onPageChange={handlePageChange}
                    onSendingData={handleSendingData}
                    address={address}
                  />
                ) : (
                  <SendFundsTxDetails
                    isOpen={isOpen}
                    onClose={onClose}
                    onPageChange={handlePageChange}
                    sendingData={sendingData}
                  />
                )}
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SendFundsModal;
