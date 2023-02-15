const StartLayout = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='w-full h-[3.5rem] bg-bgDarkLight'>Topbar</div>
      <div className='flex justify-center items-center w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
        Body
      </div>
    </div>
  )
}

export default StartLayout
