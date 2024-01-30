import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '~/components/atoms/Button';
import Spacer from '~/utils/Spacer';
import NewOwnerInput from '.';

export default {
  title: 'Components/Molecules/NewOwnerInput',
  component: NewOwnerInput,
};

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
          <NewOwnerInput />
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
