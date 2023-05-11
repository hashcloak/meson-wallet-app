import type { FC } from 'react'

const Spinner: FC = () => (
  <div className='flex justify-center'>
    <div className='animate-spin h-10 w-10 border-4 border-main rounded-full border-t-transparent'></div>
  </div>
)

export default Spinner
