import { EthAddress } from '~/utils/Ethereum';
import Spacer from '~/utils/Spacer';

// TODO: This needs to be dynamically change based on the props
const Accounts: React.FC = () => {
  const existingOwners = [
    {
      ownerName: '',
      ethAddress: '0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E',
    },
    {
      ownerName: '',
      ethAddress: '0x0A13A404B42aAb52E85Db8EA86d1F169D1F54F5d',
    },
  ];

  return (
    <div className='flex flex-col h-full'>
      <span className='text-textWhite text-2xl font-bold'>Accounts</span>

      <div className='max-w-[44rem] rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full'>
        <div className='flex flex-col rounded-2xl p-4 bg-bgDarkLight'>
          <div>
            <span className='text-xl font-bold'>Your wallet</span>
            <Spacer size={8} axis={'vertical'} />

            <div className='ml-4'>
              <EthAddress
                ethAddress={'0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'}
                size={4.5}
                length={'full'}
                walletName={'My wallet'}
              />
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>Selected network</span>
            <span className='ml-4 text-base'>Ethereum</span>
          </div>
        </div>
        <Spacer size={16} axis={'vertical'} />
        <div className='flex flex-col rounded-2xl p-4 bg-bgDarkLight'>
          <div>
            <span className='text-xl font-bold'>Your wallet</span>
            <Spacer size={8} axis={'vertical'} />

            <div className='ml-4'>
              {existingOwners.map((owner) => (
                <div key={owner.ethAddress} className='mb-2'>
                  <EthAddress
                    ethAddress={owner.ethAddress}
                    size={4.5}
                    length={'full'}
                    walletName={owner.ownerName}
                  />
                </div>
              ))}
            </div>
          </div>
          <Spacer size={24} axis={'vertical'} />
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>Required confirmations</span>
            <span className='ml-4 text-base'>1 out of 2 owners</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
