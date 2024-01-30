import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { object, z } from 'zod';
import { Button } from '~/components/atoms/Button';
import { EthAddress } from '~/utils/Ethereum';
import Spacer from '~/utils/Spacer';
import { MesonWalletState, resetMesonWallet } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { removeWallet } from '~/features/wallets';

type Props = {
  isOpen: boolean | undefined;
  onClose: () => void;
  onPageChange?: () => void;
  address?: string;
};

type RemoveWalletDetailsProps = {
  isOpen: boolean | undefined;
  onClose: () => void;
};

const RemoveWalletDetails: React.FC<RemoveWalletDetailsProps> = ({
  onClose,
}) => {
  const registerName = 'confirmToRemoveWallet';
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  const schema = object({
    confirmToRemoveWallet: z.literal(true, {
      errorMap: () => ({ message: 'Please confirm to proceed' }),
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: zodResolver(schema) });

  const onSubmit = (): void => {
    dispatch(removeWallet(mesonWallet?.mesonWalletAddress ?? ''));
    dispatch(resetMesonWallet());
    onClose();
    reset();
    navigate('/');
  };
  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <div className='flex flex-col justify-center items-center text-textGray dark:text-textWhite'>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4'>
            <div className='w-full items-center'>
              <EthAddress
                ethAddress={mesonWallet?.mesonWalletAddress ?? ''}
                size={4.5}
                length={'full'}
                walletName={'My wallet'}
              />
            </div>

            <Spacer size={16} axis={'vertical'} />
            <div className='flex flex-row items-center'>
              <span>
                You are removing a Meson Wallet{' '}
                <span className='font-bold'>ONLY</span> from your interface. It
                does not delete the Meson wallet. You can always add it back
                using the above Meson wallet’s address
              </span>
            </div>
            <div className='form-control w-full items-center'>
              <label className='label cursor-pointer'>
                <input
                  type='checkbox'
                  className='checkbox'
                  {...register(registerName)}
                  onChange={() => setIsChecked((prevState) => !prevState)}
                />
                <span className='label-text'>
                  Confirm to remove a Meson wallet
                </span>
              </label>

              <ErrorMessage
                errors={errors}
                name={registerName}
                render={({ message }) => (
                  <p className='text-alert text-sm'>{message}</p>
                )}
              />
            </div>
          </div>
        </div>

        <Spacer size={32} axis={'vertical'} />
        <div className='flex flex-row justify-around'>
          <Button
            btnVariant={'text'}
            btnSize={'lg'}
            btnType={'button'}
            handleClick={onClose}
          >
            <span className='text-lg'>Back</span>
          </Button>
          <Button
            btnVariant={isChecked ? 'alert' : 'disable'}
            btnSize={'lg'}
            btnType={'submit'}
            disabled={!isChecked}
          >
            Remove
          </Button>
        </div>
      </form>
    </div>
  );
};

const RemoveWalletModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      {(isOpen ?? false) && (
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
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8 w-[40rem]'>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Remove wallet
              </span>

                {/* Description */}
                <RemoveWalletDetails isOpen={isOpen} onClose={onClose} />
                {/* Description */}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default RemoveWalletModal;
