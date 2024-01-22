import { ChangeEvent, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import Button from '~/components/atoms/Button/Button';
import { InputControl } from '~/components/atoms/Input';
import Spacer from '~/utils/Spacer';
import { setMesonWalletName } from '~/features/mesonWallet';

const EditWalletNameDetails: React.FC<{
  walletName: string;
  onClose: () => void;
}> = ({ walletName, onClose }) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState('');

  const schema = z.object({
    walletName: z.string().min(1, { message: 'Wallet name is required' }),
  });

  const methods = useForm({
    defaultValues: {
      walletName: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { walletName: string }) => {
    dispatch(setMesonWalletName(data));
    methods.reset();
    onClose();
  };

  const onError = (errors: any, e: any) => console.log(errors, e);
  const handleWalletName = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  return (
    <div className='flex flex-col text-textGray dark:text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New wallet name</span>
          <div className=' bg-bgGrayLight  dark:bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
            <InputControl
              label='Name of the new Meson Wallet'
              placeholder={walletName}
              type='text'
              registeredName={'walletName'}
              handleChange={handleWalletName}
            ></InputControl>
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
            <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
              Review
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditWalletNameDetails;
