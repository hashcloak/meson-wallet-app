/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSelector } from 'react-redux';
import { EthAddress } from '~/utils/Ethereum';
import Spacer from '~/utils/Spacer';
import { MesonWalletState, Owner } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';

// TODO: This needs to be dynamically change based on the props
const Accounts: React.FC = () => {
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.wallets.wallet1.network
  );

  const { walletName, mesonWallet, owners, confirmation } = useSelector<
    RootState,
    MesonWalletState
  >((state) => state.wallets.wallet1.mesonWallet);

  return (
    <div className='flex flex-col h-full '>
      <span className='text-textWhite text-2xl font-bold'>Accounts</span>

      <div className='xl:max-w-[44rem] rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full'>
        <div className='flex flex-col rounded-2xl p-4 bg-bgDarkLight'>
          <div>
            <span className='text-xl font-bold'>Your Meson wallet</span>
            <Spacer size={8} axis={'vertical'} />

            <div className='ml-4'>
              <EthAddress
                // ethAddress={mesonWallet ? mesonWallet.smartContract : ''}
                ethAddress={mesonWallet ? mesonWallet.mesonWalletAddress : ''}
                size={4.5}
                length={'full'}
                walletName={walletName}
              />
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>Selected network</span>
            <span className='ml-4 text-base'>
              {`${network.charAt(0).toUpperCase()}` + `${network.slice(1)}`}
            </span>
          </div>
        </div>
        <Spacer size={16} axis={'vertical'} />
        <div className='flex flex-col rounded-2xl p-4 bg-bgDarkLight'>
          <div>
            <span className='text-xl font-bold'>Owners</span>
            <Spacer size={8} axis={'vertical'} />

            <div className='ml-4'>
              {owners?.map((owner: Owner) => (
                <div key={owner.ownerAddress} className='mb-2'>
                  <EthAddress
                    ethAddress={owner.ownerAddress}
                    size={4.5}
                    length={'full'}
                    walletName={owner.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>Required confirmations</span>
            <span className='ml-4 text-base'>
              {confirmation} out of {owners?.length} owners
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
