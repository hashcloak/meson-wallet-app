import React from 'react'

const BaseLayout = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='w-full h-[3.5rem] bg-bgDarkLight'>Topbar</div>
      <div className='flex flex-row w-full h-full bg-dark'>
        <div className='w-[5.5rem] h-full box-border py-4 bg-bgDarkMid'>
          Sidebar
        </div>
        <div className='w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
          Body
        </div>
      </div>
    </div>
  )
}

export default BaseLayout
