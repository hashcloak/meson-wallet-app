import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConnectSignerWallet from '~/components/templates/ConnectSignerWallet';
import Sidebar from '~/components/templates/Sidebar';
import Topbar from '~/components/templates/Topbar';
import { setStandby } from '~/features/loading';
import { resetSignerWallet } from '~/features/signerWallet';

const Step1: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSignerWallet());
    dispatch(setStandby());
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='w-full h-[3.5rem] bg-bgGrayLight  dark:bg-bgDarkLight box-border'>
        <Topbar />
      </div>
      <div className='flex flex-row w-full h-full bg-dark'>
        <div className='w-[5.5rem] h-full box-border py-4 bg-bgGrayMid dark:bg-bgDarkMid'>
          <Sidebar isStepper={true} isCreateNew={true} currentStep={0} />
        </div>
        <div className='w-[calc(100%-5.5rem)] h-full box-border py-8 px-[4.5rem] bg-bgDark'>
          <ConnectSignerWallet />
        </div>
      </div>
    </div>
  );
};

export default Step1;
