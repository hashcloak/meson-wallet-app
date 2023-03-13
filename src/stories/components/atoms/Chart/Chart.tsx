import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'

type Props = {
  data:
    | { name: string; Amount: number }[]
    | { name: string; 'Queued Txs': number }[]
    | { name: string; 'Historied Txs': number }[]
  isBar?: boolean
}

const Chart: React.FC<Props> = ({ data, isBar = false }) => {
  return (
    <>
      {data && !isBar ? (
        <LineChart
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
          <CartesianGrid strokeDasharray='3' />
          <XAxis dataKey='name' tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='Amount'
            stroke='#38C6F4'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      ) : (
        <BarChart width={640} height={208} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey='Queued Txs' fill='#38C6F4' />
          <Bar dataKey='Historied Txs' fill='#FF9169' />
        </BarChart>
      )}
    </>
  )
}

export default Chart
