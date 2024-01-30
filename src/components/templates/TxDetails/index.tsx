import Breadcrumb from '~/components/molecules/Breadcrumbs';
import { TxContents } from '~/components/molecules/Modal/TxModal';
import { RowBodyLong } from '~/components/organisms/RowBody';
import { mockTransactions as tx } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';

const TxDetails: React.FC = () => {
  return (
    <>
      <Breadcrumb />

      <div className='rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid py-4 px-8'>
        <div className='rounded-2xl bg-bgDarkLight h-16 bg-bgGrayLight dark:bg-bgDarkLightter px-6'>
          <RowBodyLong
            timestamp={tx[0].timestamp}
            status={tx[0].status}
            token={tx[0].token}
            amount={tx[0].amount}
            isSuccess={tx[0].isSuccess}
            numOfConfirmation={tx[0].numOfConfirmation}
          />
        </div>
        <Spacer size={24} axis={'vertical'} />
        <TxContents />
      </div>
    </>
  );
};

export default TxDetails;
