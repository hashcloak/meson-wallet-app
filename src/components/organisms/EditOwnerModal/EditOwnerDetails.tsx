import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { Button } from '~/components/atoms/Button';
import { InputControl } from '~/components/atoms/Input';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { editOwner } from '~/features/mesonWallet';

export type EditOwnerDetailsType = {
  onClose: () => void;
  name: string;
  address: string;
};

const EditOwnerDetails: React.FC<EditOwnerDetailsType> = ({
  onClose,
  name,
  address,
}) => {
  const schema = z.object({
    newName: z.string(),
  });
  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues: {
      newName: name,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { newName: string }) => {
    dispatch(
      editOwner({
        ownerAddress: address,
        name: data.newName,
      })
    );

    onClose();
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  return (
    <div className='flex flex-col text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <div className=' bg-bgDarkLight rounded-2xl p-4'>
            <InputControl
              label='Name'
              placeholder='Name*'
              type='text'
              registeredName={'newName'}
            />
            <Spacer size={8} axis={'vertical'} />
            <EthAddress ethAddress={address} size={4.5} length={'full'} />
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
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditOwnerDetails;
