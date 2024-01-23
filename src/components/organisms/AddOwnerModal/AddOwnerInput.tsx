import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '~/components/atoms/Button';
import OptionControl, {
  Options,
} from '~/components/atoms/Option/OptionControl';
import NewOwnerInput from '~/components/molecules/NewOwnerInput';
import Spacer from '~/utils/Spacer';
import { MesonWalletState, Owner } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

type AddOwnerInputType = {
  onClose: () => void;
  onPageChange: () => void;
  onSetNewOwner: (data: Owner) => void;
  onSetNewConfirmation: (data: number) => void;
};

const AddOwnerInput: React.FC<AddOwnerInputType> = ({
  onClose,
  onPageChange,
  onSetNewOwner,
  onSetNewConfirmation,
}) => {
  const [numOfConfirmation, setNumOfConfirmation] = useState<Options[]>([]);
  const { owners, confirmation } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

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
      .min(1, { message: 'Please input valid eth address' })
      .refine(
        (val) => {
          if (ethers.utils.isAddress(val)) {
            const checkOwners =
              owners?.filter(
                (o) => o.ownerAddress.toLowerCase() === val.toLowerCase()
              ) ?? [];

            return !(checkOwners.length > 0);
          }
        },
        {
          message: 'Please input valid eth address',
        }
      ),
    confirmation: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return Number(value);
      }
      if (value.trim() === '') {
        return '';
      }

      return Number(value);
    }, z.number()),
  });

  const methods = useForm({
    defaultValues: {
      newOwnerName: '',
      newOwnerAddress: '',
      confirmation: confirmation ?? 1,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: {
    newOwnerName: string;
    newOwnerAddress: string;
    confirmation: number;
  }) => {
    onSetNewOwner({
      ownerAddress: data.newOwnerAddress,
      name: data.newOwnerName,
    });
    onSetNewConfirmation(data.confirmation);
    onPageChange?.();
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  useEffect(() => {
    const fields = [...(owners ?? [])];
    fields.push({ ownerAddress: '', name: '' });

    const numOfOwners: Options[] = fields.map((_, index) => {
      return {
        value: String(index + 1),
        label: String(index + 1),
        bg: 'bg-bgGray text-textBlack',
      };
    });
    setNumOfConfirmation(numOfOwners);
  }, []);

  return (
    <div className='flex flex-col text-textGray dark:text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New owner</span>
          <div className=' bg-bgGrayLight  dark:bg-bgDarkLight p-4 flex flex-col rounded-2xl'>
            <NewOwnerInput />
          </div>

          <Spacer size={32} axis={'vertical'} />

          <span className='text-lg'>New required owner confirmation</span>
          <div className='bg-bgGrayLight  dark:bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
            <span>Any transaction requires the confirmation of:</span>
            <div className='grid grid-cols-4'>
              <div className='col-span-1 mr-2'>
                <OptionControl
                  options={numOfConfirmation}
                  registeredName={'confirmation'}
                />
              </div>
              <span className='col-span-3'>
                out of {numOfConfirmation.length} owner(s)
              </span>
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

export default AddOwnerInput;
