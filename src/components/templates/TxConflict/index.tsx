import { Button } from '~/components/atoms/Button';
import { Icon, StatusIcon } from '~/components/atoms/Icon';
import { TxContents } from '~/components/molecules/Modal/TxModal';
import { RowBodyLong } from '~/components/organisms/RowBody';
import EthAddress from '~/utils/Ethereum/EthAddress';
import { mockTransactions as tx } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';

export const TxOnChainRejection: React.FC = () => {
  return (
    <div className='flex flex-row justify-between w-full p-4 border border-borderGray rounded-b-2xl'>
      {/* Left content */}
      <div className='flex flex-col'>
        <div className='bg-light rounded-lg p-2'>
          <span className='text-textBlack'>
            This is an on-chain rejection that doesn&apos;t send any funds.
            Executing this on-chain rejection will replace all currently
            awaiting transactions with nonce 1.
          </span>
        </div>

        <Spacer size={32} axis={'vertical'} />
        <div className='text-textWhite'>
          <table className='table-auto border-separate border-spacing-x-2	text-left text-sm'>
            <tr>
              <th>Created</th>
              <td>Jul 11. 2022 - 4:40:40 PM</td>
            </tr>

            <tr>
              <th>Executed</th>
              <td>n/a</td>
            </tr>
          </table>

          <Spacer size={16} axis={'vertical'} />
          <div className='collapse'>
            <input type='checkbox' />
            <div className='collapse-title text-textLink font-medium'>
              Click to see more
            </div>
            <div className='collapse-content'>
              <table className='table-auto border-separate border-spacing-x-2	text-left text-sm'>
                <tr>
                  <th>Operation</th>
                  <td>0 (call)</td>
                </tr>

                <tr>
                  <th>TxGas</th>
                  <td>42101</td>
                </tr>

                <tr>
                  <th>baseGas</th>
                  <td>0</td>
                </tr>

                <tr>
                  <th>gasPrice</th>
                  <td>0</td>
                </tr>

                <tr>
                  <th>gasToken</th>
                  <td>0x00000000...00000000</td>
                </tr>

                <tr>
                  <th>gasToken</th>
                  <td>0x00000000...00000000</td>
                </tr>

                <tr>
                  <th>Signature 1</th>
                  <td>65 bytes</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Spacer size={48} axis={'horizontal'} />

      <div className='flex flex-col justify-start'>
        <div className='flex flex-row mb-2'>
          <Icon type={'CheckCircle'} size={'lg'} color={'main'} />
          <span className='text-main font-bold ml-2'>Created</span>
        </div>

        <div className='flex flex-col mb-2'>
          <div className='flex flex-row'>
            <Icon type={'CheckCircle'} size={'lg'} color={'main'} />

            <span className='text-main font-bold ml-2'>
              Confirmed
              <span className='text-textWhite text-sm font-normal ml-2'>
                (1 of 1)
              </span>
            </span>
          </div>
          <div className='flex flex-row items-center pl-6 mt-2'>
            <EthAddress
              ethAddress='0xD9Be7c81641BdfC2D82cAC5052455aD5313Ea5DF'
              size={4.5}
              length='full'
            />
          </div>
        </div>

        <div className='flex flex-col mb-2'>
          <div className='flex flex-row'>
            <Icon type={'Circle'} size={'lg'} color={'light'} />
            <span className='text-light font-bold ml-2'>
              Awaiting confirmations
              <span className='text-textWhite text-sm font-normal ml-2'>
                (1 of 2)
              </span>
            </span>
          </div>

          <div className='flex flex-row items-center pl-6 mt-2'>
            <EthAddress
              ethAddress='0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7'
              size={4.5}
              length='full'
            />
          </div>
        </div>

        <div className='flex flex-col mb-2'>
          <div className='flex flex-row'>
            <Icon type={'Circle'} size={'lg'} color={'white'} />
            <span className='text-textWhite font-bold ml-2'>Execution</span>
          </div>

          <span className='text-textWhite text-sm font-normal pl-6'>
            Can be executed once the threshold is reached
          </span>
        </div>

        <div className='flex flex-row justify-around mt-6'>
          <Button btnVariant={'primary'} btnSize={'md'} btnType={'button'}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

const TxConflict: React.FC = () => {
  return (
    <div className='rounded-2xl bg-bgDarkMid'>
      <div className='rounded-t-2xl bg-bgDarkLight h-16 flex items-center px-6'>
        <RowBodyLong
          timestamp={tx[0].timestamp}
          status={tx[0].status}
          token={tx[0].token}
          amount={tx[0].amount}
          isSuccess={tx[0].isSuccess}
          numOfConfirmation={tx[0].numOfConfirmation}
        />
      </div>
      <div className='w-full bg-light h-6 flex justify-center items-center'>
        <StatusIcon type={'Warning'} size={'sm'} color={'black'} />
        <span className='text-textBlack text-center mx-2'>
          Executing one will automatically replace the other(s)
        </span>
        <StatusIcon type={'Warning'} size={'sm'} color={'black'} />
      </div>

      <Spacer size={24} axis={'vertical'} />

      <div className='px-4 pb-4'>
        <div className='rounded-2xl'>
          <div className='rounded-t-2xl bg-bgDarkLight h-16 flex items-center px-6 border border-borderGray'>
            <RowBodyLong
              timestamp={tx[0].timestamp}
              status={tx[0].status}
              token={tx[0].token}
              amount={tx[0].amount}
              isSuccess={tx[0].isSuccess}
              numOfConfirmation={tx[0].numOfConfirmation}
            />
          </div>
          <TxOnChainRejection />
        </div>
        <Spacer size={16} axis={'vertical'} />
        <div className='rounded-2xl'>
          <div className='rounded-t-2xl bg-bgDarkLight h-16 flex items-center px-6 border border-borderGray'>
            <RowBodyLong
              timestamp={tx[0].timestamp}
              status={tx[0].status}
              token={tx[0].token}
              amount={tx[0].amount}
              isSuccess={tx[0].isSuccess}
              numOfConfirmation={tx[0].numOfConfirmation}
            />
          </div>
          <div className='p-4 border border-borderGray rounded-b-2xl'>
            <TxContents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TxConflict;
