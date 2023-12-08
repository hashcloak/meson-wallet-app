// import Link from 'next/link'
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

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
  // const sortedWalelts = wallets
  //   ? wallets
  //       .sort((a, b) => {
  //         return (
  //           new Date(a.lastOpened).getTime() - new Date(b.lastOpened).getTime()
  //         );
  //       })
  //       .slice(0, 5)
  //   : [];
  const mesonWallet = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  return (
    <div className='w-[51rem] max-h-[27rem] min-h-[6.5ren] bg-bgDarkMid py-4 px-8 rounded-2xl box-border '>
      <span className='text-textWhite text-xl font-bold'>
        Last Opened Wallet
      </span>
      <Spacer size={16} axis={'vertical'} />
      {mesonWallet !== undefined ? (
        // sortedWalelts.map(({ id, walletName, ethAddress, lastOpened }) => (
        // TODO: Make this part button or anchor tag
        <Link
          to='/dashboard'
          className='w-full'
          key={mesonWallet.mesonWallet?.mesonWalletAddress}
        >
          <div
            className='px-6 mb-2 hover:bg-dark w-full rounded-xl'
            role='button'
            tabIndex={0}
          >
            <div className='flex flex-row items-center justify-between '>
              <EthAddress
                walletName={mesonWallet.walletName}
                ethAddress={mesonWallet.mesonWallet?.mesonWalletAddress ?? ''}
                size={4.5}
                length={'full'}
                icons={false}
              />
              <div className='flex flex-col text-sm text-textGrayLight h-full items-center justify-center'>
                <span>Last opened</span>
                <span>{new Date(mesonWallet.timestamp).toDateString()}</span>
              </div>
            </div>
          </div>
        </Link>
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
