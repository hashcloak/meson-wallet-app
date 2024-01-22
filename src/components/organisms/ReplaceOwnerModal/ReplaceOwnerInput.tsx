import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/atoms/Button';
import NewOwnerInput from '~/components/molecules/NewOwnerInput';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { Owner } from '~/features/mesonWallet';

type ReplaceOwnerInputType = {
  name: string;
  address: string;
  onClose: () => void;
  onPageChange: () => void;
  onSetNewOwner: (data: Owner) => void;
};

const ReplaceOwnerInput: React.FC<ReplaceOwnerInputType> = ({
  onClose,
  name,
  address,
  onPageChange,
  onSetNewOwner,
}) => {
  const schema = z.object({
    newOwnerName: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return String(value);
      }
      if (value.trim() === '') {
        return '';
      }

      return String(value);
    }, z.string().optional()),
    newOwnerAddress: z
      .string()
      .min(1, { message: 'Owner Address is required' })
      .refine(
        (val) => {
          return ethers.utils.isAddress(val);
        },
        {
          message: 'Please input valid eth address',
        }
      ),
  });

  const methods = useForm({
    defaultValues: {
      name: '',
      ownerAddress: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Owner) => {
    onSetNewOwner(data);
    onPageChange?.();
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  return (
    <div className='flex flex-col text-textWhite'>
      <span className='text-lg'>Current owner</span>
      <div className=' bg-bgGrayLight  dark:bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
        <div className='pl-4'>
          <EthAddress
            ethAddress={address}
            size={4.5}
            length={'full'}
            walletName={name}
          />
        </div>
      </div>

      <Spacer size={32} axis={'vertical'} />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New owner</span>
          <div className=' bg-bgGrayLight  dark:bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
            <NewOwnerInput />
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
export default ReplaceOwnerInput;
