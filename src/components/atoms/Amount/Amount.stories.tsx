import Amount from '.'

export default {
  title: 'Components/Atmos/Amount',
  component: 'Amount',
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-row flex-wrap w-full'>
      <div className='m-4'>
        <Amount />
      </div>
    </div>
  )
}
