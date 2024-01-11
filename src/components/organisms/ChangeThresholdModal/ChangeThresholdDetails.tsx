/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useSelector } from 'react-redux';
import { Button } from '~/components/atoms/Button';
import EthAddress from '~/utils/Ethereum/EthAddress';
import Spacer from '~/utils/Spacer';
import { MesonWalletState, Owner } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

type ChangeThresholdDetailsProps = {
  newConfirmation: number;
  onClose: () => void;
  onPageChange: () => void;
  onLoad: () => void;
};

const ChangeThresholdDetails: React.FC<ChangeThresholdDetailsProps> = ({
  onClose,
  newConfirmation,
  onPageChange,
  onLoad,
}) => {
  const { walletName, mesonWallet, owners } = useSelector<RootState, MesonWalletState>((state) => state.mesonWallet);

  return (
    <>
      <div className='grid grid-cols-[30%_1fr] gap-5 rounded-2xl bg-bgDarkLight p-4 text-textWhite text-base'>
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
                ethAddress={mesonWallet?.mesonWalletAddress??''}
                size={4.5}
                length={'short'}
              />
            </div>
            <div className='flex flex-col mb-2'>
              <span className='text-sm text-textGrayLight'>
                Selected network
              </span>
              <span className='text-lg text-textWhite'>Ethereum</span>
            </div>
            <div className='flex flex-col p-2 mb-2 bg-[#397F97] rounded-2xl h-[4rem]'>
              <span className='text-sm text-textGrayLight'>
                Required confirmation
              </span>
              <span className='text-lg text-textWhite'>
                {newConfirmation} out of {owners?.length ?? 1} owners
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <span className='text-xl underline'>Owners</span>
          <Spacer size={8} axis={'vertical'} />
          <div className='pl-2 w-full'>
            {/* Owners */}
            {owners?.map((owner: Owner) => (
              <EthAddress
                ethAddress={owner.ownerAddress}
                size={4.5}
                length={'full'}
                icons={true}
                walletName={owner.name}
                key={owner.ownerAddress}
              />
            ))}
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
          // handleClick={onPageChange}
          handleClick={() => {
            onPageChange();
            onClose();
          }}
        >
          <span className='text-lg'>Back</span>
        </Button>
        <Button
          btnVariant={'primary'}
          btnSize={'lg'}
          btnType={'button'}
          handleClick={onLoad}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ChangeThresholdDetails;
