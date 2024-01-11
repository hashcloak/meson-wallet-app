import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { z } from 'zod';
import { Button } from '~/components/atoms/Button';

import { Options } from '~/components/atoms/Option/OptionControl';
import OwnerConfirmation from '~/components/molecules/OwnerConfirmation';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { confirmation } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const schema = z.object({
    confirmation: z
      .preprocess((val) => {
        if (typeof val !== 'string') {
          return Number(val);
        }

        return Number(val);
      }, z.number())
      .refine((val) => val !== confirmation, {
        message: 'Please select the new number of confirmation',
      }),
  });

  const methods = useForm({
    defaultValues: {
      confirmation: 1,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { confirmation: number }) => {
    onNewConfirmation(data.confirmation);
    onPageChange();
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const onError = (errors:any) => setErrorMessage(errors.confirmation.message ?? '');

  useEffect(() => {
    const fields = [...Array(confirmation).keys()];
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
          {errorMessage.length ? (
            <span className='text-alert text-sm'>{errorMessage}</span>
          ) : null}
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
