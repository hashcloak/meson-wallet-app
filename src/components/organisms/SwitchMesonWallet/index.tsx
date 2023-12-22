/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '~/components/atoms/Button';
import { Icon } from '~/components/atoms/Icon';
import { EthAddress } from '~/utils/Ethereum';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { WalletsState } from '~/features/wallets';
import { useControlWallet } from '~/hooks/useControlWallet';

const SwitchMesonWallet: React.FC = () => {
  const networks = ['localhost', 'ethereum', 'sepolia', 'goerli'];

  const mesonWallet = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const network = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const { wallets } = useSelector<RootState, WalletsState>(
    (state) => state.wallets
  );
  const { switchWallet } = useControlWallet();

  const [newNetworkArray, setNewNetworkArray] =
    useState<Array<string | undefined>>(networks);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    const filteredNetwork = networks.filter((n) => {
      let connectedNetwork;
      wallets.forEach((w) => {
        connectedNetwork = w.network.network;
      });

      return n === connectedNetwork;
    });
    setNewNetworkArray(filteredNetwork);
  }, []);

  return (
    <div className='my-auto	'>
      <div className='fixed top-0 left-0 z-10 space-y-2'>
        {/* Page content here */}
        <button
          type='button'
          className='flex justify-center items-center h-14 w-[5.5rem] p-1 cursor-pointer drawer-button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon type={'Lines'} size={'md'} color={'white'} />
        </button>
      </div>
      <div
        className={
          isOpen
            ? 'w-screen h-screen top-0 left-0 fixed bg-[rgb(111,111,111,0.5)] z-10'
            : ''
        }
        onClick={() => setIsOpen(!isOpen)}
        role='button'
      ></div>
      <div
        className={
          isOpen
            ? 'fixed left-0 top-0 px-4 py-6 menu w-80 min-h-full bg-base-200 text-base-content ease-linear duration-500 z-50'
            : 'fixed left-[-100%] ease-linear duration-500'
        }
      >
        <div className='w-full flex justify-end'>
          <button
            type='button'
            className='h-10 p-1 w-10 flex justify-center items-center 	'
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon type={'Close'} size={'md'} color={'white'} />
          </button>
        </div>
        {mesonWallet.mesonWallet !== undefined ? (
          <>
            <span className='text-textWhite text-xl font-bold'>
              Current wallet
            </span>
            <div className='flex flex-col mb-12'>
              <div className='w-full h-6 px-6 text-sm text-center border-borderGray rounded m-0 bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack'>
                {network.network}
              </div>
              <div className='flex flex-row mt-2 justify-between items-center py-1 px-2'>
                <EthAddress
                  ethAddress={
                    mesonWallet.mesonWallet !== undefined
                      ? mesonWallet.mesonWallet?.mesonWalletAddress
                      : ''
                  }
                  size={4}
                  length={'short'}
                  icons={false}
                  walletName={mesonWallet?.walletName}
                />
                <span>Owner</span>
              </div>
            </div>
          </>
        ) : null}

        {wallets.length > 0 ? (
          <div className='flex flex-col mb-12'>
            <span className='text-textWhite text-xl font-bold'>
              Recently used
            </span>
            <>
              {newNetworkArray.map((network) => (
                <React.Fragment                     key={network}                >
                  <div
                    className='w-full h-6 px-6 text-sm text-center border-borderGray rounded m-0 bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4]
    text-textBlack'
                  >
                    {network}
                  </div>
                  {wallets.map((w, idx) => (
                    <React.Fragment key={w.mesonWallet.mesonWallet?.mesonWalletAddress}>
                      {w.mesonWallet.mesonWallet?.mesonWalletAddress ===
                      mesonWallet.mesonWallet?.mesonWalletAddress ? null : (
                        <>
                          {w.network.network === network ? (
                            <Link
                              to='/dashboard'
                              className='w-full'
                              key={
                                w.mesonWallet.mesonWallet?.mesonWalletAddress
                              }
                              onClick={() => switchWallet(idx)}
                            >
                              <div
                                className='flex flex-row mt-2 justify-between items-center py-1 px-2 hover:bg-dark w-full rounded-xl'
                                key={
                                  w.mesonWallet.mesonWallet?.mesonWalletAddress
                                }
                              >
                                <EthAddress
                                  ethAddress={
                                    w.mesonWallet.mesonWallet !== undefined
                                      ? w.mesonWallet.mesonWallet
                                          ?.mesonWalletAddress
                                      : ''
                                  }
                                  size={4}
                                  length={'short'}
                                  icons={false}
                                  walletName={w.mesonWallet?.walletName}
                                />
                                <span className='text-textGrayLight'>
                                  Owner
                                </span>
                              </div>
                            </Link>
                          ) : null}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </>
          </div>
        ) : (
          <div className='flex items-center justify-center w-full mb-4'>
            <span className='text-textGrayLight text-base text-center'>
              No wallet recently used
            </span>
          </div>
        )}

        <div className='flex flex-col justify-between gap-4'>
          <Button btnVariant={'primary'} btnSize={'md'} btnType={'submit'}>
            <Link to='/create-new/step1' className='w-full'>
              Create new
            </Link>
          </Button>
          <Button btnVariant={'border'} btnSize={'md'} btnType={'submit'}>
            <Link to='/create-new/step1' className='w-full'>
              Add existing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwitchMesonWallet;
