/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import Button from '../../atoms/Button/Button';
import { MesonWalletState, Owner } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';

type ReplaceOwnerDetailsProps = {
  newOwner: Owner;
  name: string;
  address: string;
  onClose: () => void;
  onPageChange: () => void;
};

const ReplaceOwnerDetails: React.FC<ReplaceOwnerDetailsProps> = ({
  onClose,
  newOwner,
  name,
  address,
  onPageChange,
}) => {
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([]);
  const { walletName, owners, confirmation, mesonWallet } = useSelector<
    RootState,
    MesonWalletState
  >((state) => state.mesonWallet);

  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  useEffect(() => {
    const filterOwners = owners?.filter((owner) => {
      return (
        owner.ownerAddress !== address &&
        owner.ownerAddress !== newOwner?.newOwnerAddress
      );
    });
    setFilteredOwners(filterOwners ?? []);
  }, []);

  return (
    <>
      <div className='grid grid-cols-[30%_1fr] gap-5 rounded-2xl bg-bgDarkLight p-4 w-full  text-textWhite text-base'>
        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Details</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2'>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Name of the Meson Wallet
              </span>
              <span className='text-lg text-textWhite'>{walletName}</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Address of the Meson Wallet
              </span>
              <EthAddress
                ethAddress={mesonWallet?.mesonWalletAddress ?? ''}
                size={4.5}
                length={'short'}
              />
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Selected network
              </span>
              <span className='text-lg text-textWhite'>{network}</span>
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Required confirmation
              </span>
              <span className='text-lg text-textWhite'>
                1 out of {confirmation} owners
              </span>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Owners</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2 w-full'>
            {/* Owners */}
            {filteredOwners?.map((owner: Owner) => (
              <EthAddress
                ethAddress={owner.ownerAddress}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={owner.name}
                key={owner.ownerAddress}
              />
            ))}

            <Spacer size={8} axis={'vertical'} />

            <div className='flex flex-col justify-center p-2 mb-2 bg-[#DC2626] rounded-2xl h-[4.5rem] box-border w-full'>
              <span className='font-bold'>Removing owner</span>
              <EthAddress
                ethAddress={address}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={name}
              />
            </div>

            <div className='flex flex-col justify-center p-2 mb-2 bg-[#397F97] rounded-2xl h-[4.5rem] box-border w-full'>
              <span className='font-bold'>New owner</span>
              <EthAddress
                ethAddress={newOwner?.newOwnerAddress ?? ""}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={newOwner?.newOwnerName}
              />
            </div>
          </div>
        </div>
      </div>
      <Spacer size={16} axis={'vertical'} />
      <div
        tabIndex={0}
        className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box'
      >
        <div className='collapse-title text-base font-bold bg-bgDarkLight'>
          Advanced parameters
        </div>
        <div className='collapse-content flex flex-col w-full bg-bgDarkLight'>
          <div className='flex flex-row justify-around w-full'>
            <span>Nonce</span>
            <span>33</span>
          </div>
          <div className='flex flex-row justify-around w-full'>
            <span>TxGas</span>
            <span>43634</span>
          </div>
        </div>
      </div>
      <Spacer size={32} axis={'vertical'} />

      <div className='flex flex-row justify-around'>
        <Button
          btnVariant={'text'}
          btnSize={'lg'}
          btnType={'button'}
          handleClick={onPageChange}
        >
          <span className='text-lg'>Back</span>
        </Button>
        <Button
          btnVariant={'primary'}
          btnSize={'lg'}
          btnType={'submit'}
          handleClick={onClose}
        >
          Submit
        </Button>
      </div>
    </>
  );
};
export default ReplaceOwnerDetails;
