import Chart from '../../atoms/Chart/Chart'
import Tabs from '../../molecules/Tab/Tabs'

// TODO: Check where to fetch the data and consider if props needs to be passed from the parent
const AssetChart = () => {
  const week = [
    { name: 'Sun', Amount: 100 },
    { name: 'Mon', Amount: 2400 },
    { name: 'Tue', Amount: 300 },
    { name: 'Wed', Amount: 2700 },
    { name: 'Thu', Amount: 2300 },
    { name: 'Fri', Amount: 3000 },
    { name: 'Sat ', Amount: 400 },
  ]
  const month = [
    { name: '14 Jan', Amount: 100 },
    { name: '16 Jan', Amount: 2400 },
    { name: '18 Jan', Amount: 100 },
    { name: '20 Jan', Amount: 500 },
    { name: '22 Jan', Amount: 100 },
    { name: '24 Jan', Amount: 1600 },
    { name: '26 Jan', Amount: 500 },
    { name: '28 Jan', Amount: 100 },
    { name: '30 Jan', Amount: 2400 },
    { name: '1 Feb', Amount: 100 },
    { name: '3 Feb', Amount: 100 },
    { name: '5 Feb', Amount: 500 },
    { name: '7 Feb', Amount: 2400 },
    { name: '9 Feb', Amount: 1600 },
    { name: '11 Feb', Amount: 1600 },
    { name: '13 Feb', Amount: 100 },
  ]
  const threeMonth = [
    { name: '14 Nov', Amount: 100 },
    { name: '21 Nov', Amount: 2400 },
    { name: '28 Nov', Amount: 100 },
    { name: '5 Dec', Amount: 500 },
    { name: '12 Dec', Amount: 100 },
    { name: '19 Dec', Amount: 1600 },
    { name: '26 Dec', Amount: 500 },
    { name: '2 Jan', Amount: 100 },
    { name: '9 Jan', Amount: 2400 },
    { name: '16 Jan', Amount: 100 },
    { name: '23 Jan', Amount: 100 },
    { name: '30 Jan', Amount: 500 },
    { name: '6 Feb', Amount: 2400 },
    { name: '13 Feb', Amount: 1600 },
  ]
  const halfYear = [
    { name: '22 Aug', Amount: 100 },
    { name: '5 Sep', Amount: 2400 },
    { name: '19 Sep', Amount: 500 },
    { name: '3 Oct', Amount: 100 },
    { name: '17 Oct', Amount: 500 },
    { name: '31 Oct', Amount: 2400 },
    { name: '14 Nov', Amount: 1600 },
    { name: '28 Nov', Amount: 500 },
    { name: '12 Dec', Amount: 2400 },
    { name: '26 Dec', Amount: 1600 },
    { name: '9 Jan', Amount: 100 },
    { name: '23 Jan', Amount: 500 },
    { name: '6 Feb', Amount: 100 },
  ]
  const year = [
    { name: '22 Mar', Amount: 100 },
    { name: '22 Apr', Amount: 2400 },
    { name: '22 May', Amount: 500 },
    { name: '22 Jun', Amount: 100 },
    { name: '22 Jul', Amount: 500 },
    { name: '22 Aug', Amount: 2400 },
    { name: '22 Sep', Amount: 1600 },
    { name: '22 Oct', Amount: 500 },
    { name: '22 Nov', Amount: 2400 },
    { name: '22 Dec', Amount: 1600 },
    { name: '22 Jan', Amount: 100 },
    { name: '22 Feb', Amount: 100 },
  ]

  const tabList: { [key: string]: JSX.Element }[] = [
    { '1 wk': <Chart data={week} /> },
    { '1 mo': <Chart data={month} /> },
    { '3 mo': <Chart data={threeMonth} /> },
    { '1/2 yr': <Chart data={halfYear} /> },
    { '1 yr': <Chart data={year} /> },
  ]

  return <Tabs tabList={tabList} />
}

export default AssetChart
