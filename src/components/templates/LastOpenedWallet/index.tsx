// import Link from 'next/link'
import React from 'react';
import { Link } from 'react-router-dom';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { useControlWallet } from '~/hooks/useControlWallet';

type LastOpenedWalletType = {
  id: number;
  walletName: string;
  ethAddress: string;
  lastOpened: number;
};

type Props = {
  wallets?: LastOpenedWalletType[];
};

const LastOpenedWallet: React.FC<Props> = () => {
  const { wallets, switchWallet } = useControlWallet();

  return (
    <div className='w-[51rem] max-h-[27rem] min-h-[6.5ren] bg-bgGrayMid dark:bg-bgDarkMid py-4 px-8 rounded-2xl box-border '>
      <span className='text-textGray dark:text-textWhite text-xl font-bold'>
        Last Opened Wallet
      </span>
      <Spacer size={16} axis={'vertical'} />
      {wallets.length > 0 &&
      wallets[0].mesonWallet.mesonWallet !== undefined ? (
        wallets.map((wallet, idx) => (
          <Link
            to='/dashboard'
            className='w-full'
            key={wallet.mesonWallet.mesonWallet?.mesonWalletAddress}
            onClick={() => switchWallet(idx)}
          >
            <div
              className='px-6 mb-2 hover:bg-dark text-textGray dark:text-textWhite hover:text-textWhite w-full rounded-xl'
              role='button'
              tabIndex={0}
            >
              <div className='flex flex-row items-center justify-between '>
                <EthAddress
                  walletName={wallet.mesonWallet.walletName}
                  ethAddress={
                    wallet.mesonWallet.mesonWallet?.mesonWalletAddress ?? ''
                  }
                  size={4.5}
                  length={'full'}
                  icons={false}
                />
                <div className='flex flex-col text-sm text-textGrayLight h-full items-center justify-center'>
                  <span>Last opened</span>
                  <span>
                    {new Date(wallet.mesonWallet.timestamp).toDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className='flex items-center justify-center w-full mb-4'>
          <span className='text-textGrayLight text-base text-center'>
            No wallet recently used
          </span>
        </div>
      )}
    </div>
  );
};

export default LastOpenedWallet;
