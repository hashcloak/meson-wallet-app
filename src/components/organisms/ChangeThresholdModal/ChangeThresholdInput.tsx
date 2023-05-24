import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '~/components/atoms/Button';

import { Options } from '~/components/atoms/Option/OptionControl';
import OwnerConfirmation from '~/components/molecules/OwnerConfirmation';
import Spacer from '~/utils/Spacer';

type ChangeThresholdInputType = {
  onClose: () => void;
  onPageChange: () => void;
  onNewConfirmation: (data: any) => void;
};

const ChangeThresholdInput: React.FC<ChangeThresholdInputType> = ({
  onClose,
  onPageChange,
  onNewConfirmation,
}) => {
  const [numOfConfirmation, setNumOfConfirmation] = useState<Options[]>([]);

  const methods = useForm({
    defaultValues: {
      confirmation: '1',
    },
  });

  const onSubmit = (data: { confirmation: string }) => {
    onNewConfirmation(data.confirmation);
    onPageChange();
    console.log(data);
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  useEffect(() => {
    const fields = [1, 2];
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
    <div className='flex flex-col text-textWhite w-full'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <span className='text-lg'>New required owner confirmation</span>
          <div className='bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
            <OwnerConfirmation numOfConfirmation={numOfConfirmation} />
          </div>
          <Spacer size={24} axis={'vertical'} />
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

export default ChangeThresholdInput;
