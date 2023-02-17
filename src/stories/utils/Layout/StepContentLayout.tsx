import React from 'react'

type Props = {
  isBtn?: boolean
  children: React.ReactNode
}

const StepContentLayout: React.FC<Props> = ({ isBtn = false, children }) => {
  const contentStyle = isBtn
    ? 'flex items-center justify-center gap-8 rounded-2xl bg-bgDarkLight  box-border py-4 px-8'
    : 'grid grid-cols-2 gap-[7rem] rounded-2xl bg-bgDarkLight  box-border py-4 px-8'
  return <div className={contentStyle}>{children}</div>
}

export default StepContentLayout
