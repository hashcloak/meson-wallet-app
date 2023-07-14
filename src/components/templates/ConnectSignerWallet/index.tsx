/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as z from 'zod';
import { Button } from '~/components/atoms/Button';
import CustomLink from '~/components/atoms/CustomLink';
import { InputControl } from '~/components/atoms/Input';
import { SelectNetwork } from '~/components/atoms/Option';
import SignerWallets from '~/components/molecules/SignerWallets';
import { StepContentLayout, StepWrapper } from '~/utils/Layouts';
import Spacer from '~/utils/Spacer';
import { setMesonWalletName } from '~/features/mesonWallet';

const ConnectSignerWallet: React.FC = () => {
  const [userInput, setUserInput] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    navigate('/create-new/step2');
    methods.reset();
  };

  const onError = (errors: any, e: any) => console.log(errors, e);
  const handleWalletName = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>
          ① Connect your signer wallet
        </span>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <StepWrapper>
              {/* 1st row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span>
                    In order to select the network to create your Meson Wallet,
                    your wallet need to be connected.{' '}
                    <CustomLink url={''} size={'base'}>
                      Why do you need to connect a signer wallet?
                    </CustomLink>
                  </span>
                  <Spacer size={24} axis={'vertical'} />
                  <span>
                    Select network on which the Meson wallet was created
                  </span>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-wrap gap-2 '>
                    <SignerWallets />
                  </div>
                  <Spacer size={24} axis={'vertical'} />
                  <div className='w-1/3'>
                    <SelectNetwork />
                  </div>
                </div>
              </StepContentLayout>

              {/* 2nd row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span className='text-xl underline'>Name of your wallet</span>
                  <Spacer size={8} axis={'vertical'} />
                  <span>
                    This name is only stored locally and will never be shared
                    with Meson or any third parties.{' '}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <InputControl
                    label='Name of the new Meson Wallet'
                    placeholder='Your-wallet-name*'
                    type='text'
                    registeredName={'walletName'}
                    handleChange={handleWalletName}
                  >
                    <span className='text-textWhite text-sm'>
                      By continuing you consent to{' '}
                      <CustomLink url={''} size={'sm'}>
                        the terms of use
                      </CustomLink>{' '}
                      and{' '}
                      <CustomLink url={''} size={'sm'}>
                        privacy policy
                      </CustomLink>
                      .
                    </span>
                  </InputControl>
                </div>
              </StepContentLayout>

              {/* Button */}
              <StepContentLayout isBtn={true}>
                <Link to='/'>
                  <Button
                    btnVariant={'text'}
                    btnSize={'lg'}
                    btnType={'button'}
                    handleClick={() => console.log('Cancel')}
                  >
                    Cancel
                  </Button>
                </Link>

                {/* TODO:Button validation needs to be updated based on signer wallet connection */}
                <Button
                  btnVariant={userInput.length ? 'primary' : 'disable'}
                  btnSize={'lg'}
                  btnType={'submit'}
                  disabled={!userInput.length}
                >
                  Next
                </Button>
              </StepContentLayout>
            </StepWrapper>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ConnectSignerWallet;
