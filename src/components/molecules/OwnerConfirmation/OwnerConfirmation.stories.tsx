import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '~/components/atoms/Button';
import Spacer from '~/utils/Spacer';
import OwnerConfirmation from '.';

export default {
  title: 'Components/Molecules/OwnerConfirmation',
  component: OwnerConfirmation,
};

const confirmation = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

export const Default: React.FC = (): React.ReactElement => {
  const methods = useForm({
    defaultValues: {
      confirmation: '1',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <span className='text-lg'>New required owner confirmation</span>
        <div className='bg-bgGrayLight  dark:bg-bgDarkLight p-4 rounded-2xl flex flex-col'>
          <OwnerConfirmation numOfConfirmation={confirmation} />
        </div>
        <Spacer size={24} axis={'vertical'} />
        <div className='flex flex-row justify-around'>
          <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
            Review
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
