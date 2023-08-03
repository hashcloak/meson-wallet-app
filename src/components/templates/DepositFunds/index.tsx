/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '~/components/atoms/Button';
import { UnitInput } from '~/components/atoms/Input';
import { Loader } from '~/components/atoms/Loader';
import { StepContentLayout, StepWrapper } from '~/utils/Layouts';
import Spacer from '~/utils/Spacer';
import { setError } from '~/features/error';
import { LoadingState, resetLoading, setLoading } from '~/features/loading';
import { setMesonWallet } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';
import { setToast } from '~/features/toast';
import { deploy } from '~/service/smart_contract/deploy-contract';

const DepositFund: React.FC = () => {
  const register = 'depositAmount';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  const signerWallet = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const selectedNetwork = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const { isLoading } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  // TODO: Need to add validation method for the input amount
  const schema = z.object({
    depositAmount: z.preprocess((value) => {
      if (typeof value !== 'string') {
        return Number(value);
      }
      if (value.trim() === '') {
        return NaN;
      }

      return Number(value);
    }, z.union([z.number().nonnegative(), z.number().gt(0)]).optional()),
  });

  const methods = useForm({
    defaultValues: {
      depositAmount: 0,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    // Create wallet with/without funds
    try {
      if (signerWallet != null) {
        dispatch(setLoading());
        const mesonWallet:
          | { address: string; smartContract: string }
          | undefined = await deploy(
          signerWallet,
          selectedNetwork,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          data.depositAmount as number
        );

        if (mesonWallet !== undefined) {
          setIsSuccess(true);
          dispatch(setToast({ message: 'Successfully deployed' }));
          dispatch(setMesonWallet({ mesonWallet }));
          setTimeout(() => {
            navigate('/dashboard');
            dispatch(resetLoading({ message: '' }));
          }, 5000);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
        dispatch(resetLoading({ message: '' }));
      }
    }

    // Fail
  };

  const onError = (errors: any, e: any) => console.log('Error:', errors, e);

  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <div>
        <span className='text-textWhite text-2xl font-bold'>
          ④ Create wallet
        </span>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <StepWrapper>
              {/* 1st row */}
              <StepContentLayout>
                <div className='flex flex-col text-textWhite text-base max-w-[35rem]'>
                  <div>
                    <span className='text-xl underline'>Deposit funds</span>
                    <span className='text-sm'> (Optional)</span>
                  </div>
                  <Spacer size={8} axis={'vertical'} />
                  <div className='pl-4'>
                    <div className='flex flex-col mb-2'>
                      <span className='text-lg text-textWhite'>
                        You can transfer funds from your signer wallet, but make
                        sure you have enough funds in it.
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col text-textWhite text-base max-w-[35rem] justify-center'>
                  <div className='pl-4'>
                    <UnitInput
                      registeredName={register}
                      label={'Deposit amount (optional)'}
                      type='text'
                      unit='ETH'
                      placeholder={'Optional'}
                    >
                      <span className='text-textGrayLight'>≈ 000.00 USD</span>
                    </UnitInput>
                  </div>
                </div>
              </StepContentLayout>

              {/* Button */}
              <StepContentLayout isBtn={true}>
                <Button
                  btnVariant={'text'}
                  btnSize={'lg'}
                  btnType={'button'}
                  disabled={!!isLoading}
                  handleClick={() => navigate(-1)}
                >
                  Back
                </Button>
                {/* TODO:Button validation needs to be updated based on signer wallet connection */}
                <Button
                  btnVariant={!isLoading ? 'primary' : 'disable'}
                  disabled={!!isLoading}
                  btnSize={'lg'}
                  btnType={'submit'}
                >
                  Create
                </Button>
              </StepContentLayout>
            </StepWrapper>
          </form>
        </FormProvider>
      </div>
      <Loader isSuccess={isSuccess} isLoading={isLoading} />
    </div>
  );
};

export default DepositFund;
