import React from 'react'

type Props = {
  topbar: JSX.Element
  sidebar: JSX.Element
  body: JSX.Element
}

const BaseLayout: React.FC<Props> = ({ topbar, sidebar, body }) => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='w-full h-[3.5rem] bg-bgDarkLight'>{topbar}</div>
      <div className='flex flex-row w-full h-full bg-dark'>
        <div className='w-[5.5rem] h-full box-border py-4 bg-bgDarkMid'>
          {sidebar}
        </div>
        <div className='w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
          {body}
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
