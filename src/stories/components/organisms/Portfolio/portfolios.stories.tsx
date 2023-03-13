import Portfolio from './Portfolio'

export default {
  title: 'Components/Organisms/Portfolio',
  component: Portfolio,
}

export const Portfolios = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Portfolio />
      </div>
    </div>
  )
}
