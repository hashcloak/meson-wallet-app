import React from 'react'

type Props = {
  children: React.ReactNode
}

const StepWrapper: React.FC<Props> = ({ children }) => {
  return <div className='flex flex-col gap-2 max-w-[78rem] box-border'>{children}</div>
}

export default StepWrapper
