/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { object, z } from 'zod';
import { Button } from '~/components/atoms/Button';
import { Icon } from '~/components/atoms/Icon';
import { Options } from '~/components/atoms/Option/OptionControl';
import { validateEthAddress } from '~/utils/Ethereum/AddressValidator';
import { StepContentLayout, StepWrapper } from '~/utils/Layouts';
import Spacer from '~/utils/Spacer';
import { Owner, setOwners } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';

const RegisterAccountInfo: React.FC = () => {
  const [numOfConfirmation, setNumOfConfirmation] = useState<Options[]>([]);
  const [currentVal, setCurrentVal] = useState<number>(0);
  const [duplicatedAddress, setDuplicatedAddress] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signerWalletAddress } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );

  const schema = object({
    owners: z
      .object({
        // ownerName: z.string().optional(),
        ownerName: z.string().optional(),
        ownerAddress: z
          .string()
          .min(1, { message: 'Owner address is required' })
          .refine((v: unknown) => {
            return validateEthAddress(String(v));
          }, 'Please input valid Eth address'),
      })
      .array(),
  });

  const {
    register,
    control,
    reset,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      owners: [{ ownerName: '', ownerAddress: signerWalletAddress }],
      confirmation: 1,
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'owners',
  });

  const onSubmit = (data: unknown) => {
    const { owners } = data as { owners: Owner[] };
    const confirmation = getValues('confirmation');

    const duplicatedAddress = owners.filter(({ ownerAddress }) => {
      return String(ownerAddress) === String(signerWalletAddress);
    });

    if (duplicatedAddress.length > 1) {
      setDuplicatedAddress(true);
    } else {
      dispatch(
        setOwners({
          owners,
          confirmation,
        })
      );

      setDuplicatedAddress(false);
      reset();
      navigate('/create-new/step3');
    }
  };

  const onError = (errors: any, e: any) =>
    console.log('submit error:', errors, e);

  useEffect(() => {
    setNumOfConfirmation([]);
    const numOfOwners: Options[] = fields.map((confirmation, index) => {
      return {
        value: index + 1,
        label: index + 1,
        bg: 'bg-bgGray text-textBlack',
      };
    });
    setNumOfConfirmation(numOfOwners);
  }, [fields]);

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
          ② Register account info
        </span>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <StepWrapper>
            {/* 1st row */}
            <StepContentLayout>
              <div className='flex flex-col text-textGray dark:text-textWhite text-base max-w-[35rem]'>
                <span className='text-xl underline'>Adding owners</span>
                <Spacer size={8} axis={'vertical'} />
                <span>
                  Your Meson Wallet will have one or more owners. We have filled
                  out the first owner with your connected wallet details, but
                  you can also assign a different owner.
                </span>
              </div>

              <div className='flex flex-col'>
                {fields.map((field, index: number) => (
                  <div key={field.id} className='mb-2'>
                    <div className='grid grid-cols-8 gap-1 w-full'>
                      <div className='col-span-2'>
                        <input
                          {...register(`owners.${index}.ownerName`)}
                          placeholder='Owner name*'
                          type='text'
                          className='border border-borderGray text-base bg-bgWhite rounded-md px-4 py-2 text-textBlack w-full'
                          name={`owners.${index}.ownerName`}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`owners.${index}.ownerName`}
                          render={({ message }) => (
                            <p className='text-alert text-sm'>{message}</p>
                          )}
                        />
                      </div>

                      <div className='col-span-5'>
                        <input
                          {...register(`owners.${index}.ownerAddress`)}
                          placeholder={index === 0 ? '' : 'Owner address*'}
                          type='text'
                          className='border border-borderGray text-base bg-bgWhite rounded-md px-4 py-2 text-textBlack w-full'
                          name={`owners.${index}.ownerAddress`}
                          onChange={() => setDuplicatedAddress(false)}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`owners.${index}.ownerAddress`}
                          render={({ message }) => (
                            <p className='text-alert text-sm'>{message}</p>
                          )}
                        />
                      </div>
                      {index === 0 ? null : (
                        <div className='col-span-1 flex items-center'>
                          <button onClick={() => remove(index)} className=' '>
                            <Icon
                              type={'FailCircle'}
                              size={'lg'}
                              color={'alert'}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={() => append({ ownerName: '', ownerAddress: '' })}
                  className='text-textLink font-bold text-sm text-left'
                >
                  + Add more owner
                </button>
                {duplicatedAddress && (
                  <span className='text-textBlack text-sm rounded-md bg-light px-2 inline-block'>
                    The address is duplicated. Please correct the value.
                  </span>
                )}
              </div>
            </StepContentLayout>

            {/* 2nd row */}
            <StepContentLayout>
              <div className='flex flex-col text-textGray dark:text-textWhite text-base max-w-[35rem]'>
                <span className='text-xl underline'>
                  Set number of confirmation
                </span>
                <Spacer size={8} axis={'vertical'} />
                <span>
                  Specifying how many of them need to confirm a transaction
                  before it gets executed. <br />
                  Basically, the more confirmations required, the more secure
                  your Meson Wallet is.
                </span>
              </div>

              <div className='flex flex-col text-textGray dark:text-textWhite'>
                <span>Any transaction requires the confirmation of:</span>
                <div className='grid grid-cols-4'>
                  <div className='col-span-1 mr-2'>
                    <select
                      className={
                        'text-textBlack form-select appearance-none block w-full h-6 px-6 text-sm text-center border-borderGray rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none bg-bgGray'
                      }
                      {...register('confirmation')}
                      name={'confirmation'}
                      onChange={(e) => setCurrentVal(Number(e.target.value))}
                      defaultValue={currentVal}
                    >
                      {numOfConfirmation?.map((option, key) => (
                        <option value={option.value} key={key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className='col-span-3'>
                    out of {numOfConfirmation.length} owner(s)
                  </span>
                </div>
              </div>
            </StepContentLayout>

            {/* Button */}
            <StepContentLayout isBtn={true}>
              <Button
                btnVariant={'text'}
                btnSize={'lg'}
                btnType={'button'}
                handleClick={() => {
                  navigate(-1);
                }}
              >
                Back
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

export default RegisterAccountInfo;
