import React, { ChangeEvent, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as z from 'zod';
import { Button } from '~/components/atoms/Button';
import CustomLink from '~/components/atoms/CustomLink';
import { InputControl } from '~/components/atoms/Input';
import { SelectNetwork } from '~/components/atoms/Option';
import { StepContentLayout, StepWrapper } from '~/utils/Layouts';
import Spacer from '~/utils/Spacer';
import { setError } from '~/features/error';

const SelectMesonWallet: React.FC = () => {
  const [walletNameInput, setWalletNameInput] = useState('');
  const [walletAddressInput, setWalletAddressInput] = useState('');
  const dispatch = useDispatch()
  const schema = z.object({
    walletName: z.string().min(1, { message: 'Owner name is required' }),
    walletAddress: z.string().min(1, { message: 'Owner address is required' }),
  });

  const methods = useForm({
    defaultValues: {
      walletName: '',
      walletAddress: '',
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = ({walletName, walletAddress}: {
    walletName:string,
    walletAddress: string,
  }) => {
    if(ethers.utils.isAddress(walletAddress)){
      try{
      // fetch meson wallet info(owner, chain etc)
      }catch(error){
        if (error instanceof Error) {
          dispatch(setError({ error: "Please input valid Meson Wallet address" }));
        }
      }
    }else{
      // return error
      dispatch(setError({ error: "Please input valid Meson Wallet address" }));
    }
  };

  const handleWalletName = (e: ChangeEvent<HTMLInputElement>) => {
    setWalletNameInput(e.target.value);
  };
  const handleWalletAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setWalletAddressInput(e.target.value);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>
          ① Select Meson Wallet
        </span>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepWrapper>
              {/* 1st row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span>
                    Select network on which the Meson wallet was created
                  </span>
                </div>
                <div className='max-w-[11.5rem] flex justify-center mx-[0.5rem]'>
                  <SelectNetwork />
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
                    handleChange={(e) => handleWalletName(e)}
                  >
                    <span className='text-textWhite text-sm'>
                      By continuing you consent to{' '}
                      <CustomLink url={''} size={'sm'}>
                        the terms of use
                      </CustomLink>
                      and
                      <CustomLink url={''} size={'sm'}>
                        privacy policy
                      </CustomLink>
                      .
                    </span>
                  </InputControl>
                </div>
              </StepContentLayout>

              {/* 3rd row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <span className='text-xl underline'>Wallet address</span>
                  <Spacer size={8} axis={'vertical'} />
                  <span>
                    Enter your Meson wallet address. You will only have a
                    read-only view if your connected signer wallet is not the
                    owner of this Meson wallet.
                  </span>
                </div>
                <div className='flex flex-col'>
                  <InputControl
                    label='Meson wallet Address'
                    placeholder='0xfF0000000000000000000000000000000000*'
                    type='text'
                    registeredName={'walletAddress'}
                    handleChange={(e) => handleWalletAddress(e)}
                  />
                </div>
              </StepContentLayout>

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
                <Button
                  btnVariant={
                    walletAddressInput.length && walletNameInput.length
                      ? 'primary'
                      : 'disable'
                  }
                  btnSize={'lg'}
                  btnType={'submit'}
                  disabled={
                    !(walletAddressInput.length && walletNameInput.length)
                  }
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

export default SelectMesonWallet;
