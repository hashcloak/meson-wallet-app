import React, { useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, z } from 'zod';
import { Button } from '~/components/atoms/Button';
import EthAddress from '~/utils/Ethereum/EthAddress';
import { StepContentLayout, StepWrapper } from '~/utils/Layouts';
import Spacer from '~/utils/Spacer';

const OwnerSetting: React.FC = () => {
  const [existingOwners, setExistingOwners] = useState<
    Array<{ ownerName: string; ethAddress: string }>
  >([]);
  const schema = object({
    owner: z
      .object({
        ownerName: z.string().optional(),
      })
      .array(),
  });
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any): void => {
    reset();
  };
  const onError = (errors: any, e: any) => console.log(errors, e);

  useEffect(() => {
    const existingOwners = [
      {
        ownerName: '',
        ethAddress: '0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E',
      },
      {
        ownerName: '',
        ethAddress: '0x0A13A404B42aAb52E85Db8EA86d1F169D1F54F5d',
      },
    ];
    setExistingOwners(existingOwners);
  }, []);

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
          ② Owner setting
        </span>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <StepWrapper>
            {/* 1st row */}
            <div className='rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid  box-border py-4 px-8'>
              <div className='flex flex-col text-textGray dark:text-textWhite text-base '>
                <span>
                  This Meson wallet on Ethereum has {existingOwners.length}{' '}
                  owners. Optional: Provide a name for each owner.
                </span>
              </div>
              <Spacer size={16} axis={'vertical'} />
              <div className='flex flex-col'>
                {existingOwners.map(
                  (
                    owner: { ethAddress: string; ownerName: string },
                    index: number
                  ) => (
                    <div key={owner.ethAddress} className='mb-2'>
                      <div className='grid grid-cols-8 gap-2 w-full'>
                        <div className='col-span-2'>
                          <input
                            {...register(`owner.${index}.ownerName`)}
                            placeholder={`Owner ${index + 1} *`}
                            type='text'
                            className='border border-borderGray text-base bg-bgWhite rounded-md px-4 py-2 text-textBlack w-full'
                            name={`owner.${index}.ownerName`}
                          />
                          <ErrorMessage
                            errors={errors}
                            name={`owner.${index}.ownerName`}
                            render={({ message }) => (
                              <p className='text-alert text-sm'>{message}</p>
                            )}
                          />
                        </div>

                        <div className='col-span-6'>
                          <EthAddress
                            ethAddress={owner.ethAddress}
                            size={4.5}
                            length={'full'}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Button */}
            <StepContentLayout isBtn={true}>
              <Button
                btnVariant={'text'}
                btnSize={'lg'}
                btnType={'button'}
                handleClick={() => console.log('Cancel')}
              >
                Cancel
              </Button>
              {/* TODO:Button validation needs to be updated based on signer wallet connection */}
              <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
                Next
              </Button>
            </StepContentLayout>
          </StepWrapper>
        </form>
      </div>
    </div>
  );
};

export default OwnerSetting;
