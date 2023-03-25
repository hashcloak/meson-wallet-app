import { RowBodyLong, RowBodyShort } from '.'

export default {
  title: 'Components/Molecules/RowBody',
  component: { RowBodyLong, RowBodyShort },
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-col'>
      <RowBodyLong timestamp={0} status={'Send'} />
      <RowBodyShort timestamp={0} status={'Send'} />
    </div>
  )
}
