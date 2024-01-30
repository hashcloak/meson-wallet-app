import { useSelector } from 'react-redux';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import Spinner from '../Spinner';
import { LoadingState } from '~/features/loading';
import { RootState } from '~/features/reducers';
import { DataOfTransactionsType } from '~/hooks/useCountTx';

type Props = {
  data:
    | Array<{ Date: string; Received: number }>
    | Array<{ Date: string; Sent: number }>
    | DataOfTransactionsType;
  isDashboard?: boolean;
};

const pStyle = {
  color: 'blue',
};

const divStyle = {
  background: 'white',
  fontWeight: 'bold',
  border: 'solid 1px black',
};

const Chart: React.FC<Props> = ({ data, isDashboard = false }) => {
  const { isLoading } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );

  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center p-4 box-border min-w-[51rem] min-h-[14rem]'>
        <Spinner />
      </div>
    );
  } else {
    if (data.length <= 0) {
      return (
        <div className='w-full h-full flex justify-center items-center p-4 box-border min-w-[51rem] min-h-[14rem]'>
          <p>No transaction in this period</p>
        </div>
      );
    } else {
      return (
        <>
          {data.length && isDashboard ? (
            <BarChart
              width={816}
              height={224}
              data={data}
              margin={{
                top: 40,
                right: 30,
                left: 20,
                bottom: 8,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='Date'
                tick={{ fill: 'white', fontSize: '10px' }}
                angle={-30}
                dx={-10}
                dy={5}
                interval={0}
              />
              <YAxis tick={{ fill: 'white' }} />
              <Tooltip contentStyle={divStyle} labelStyle={pStyle} />
              <Legend />
              <Bar dataKey='Received' fill='#38C6F4' unit={'ETH'} />
              <Bar dataKey='Sent' fill='#FF9169' unit={'ETH'} />
            </BarChart>
          ) : (
            <BarChart width={640} height={208} data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' tick={{ fill: 'white' }} />
              <YAxis tick={{ fill: 'white' }} />
              <Tooltip contentStyle={divStyle} labelStyle={pStyle} />
              <Legend />
              <Bar dataKey='Queued Txs' fill='#38C6F4' />
              <Bar dataKey='Historied Txs' fill='#FF9169' />
            </BarChart>
          )}
        </>
      );
    }
  }
};

export default Chart;
