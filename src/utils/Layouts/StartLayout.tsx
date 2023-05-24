/* eslint-disable @typescript-eslint/strict-boolean-expressions */
type Props = {
  topbar?: React.ReactNode;
  body?: React.ReactNode;
};

const StartLayout: React.FC<Props> = ({ topbar, body }) => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      {topbar ? (
        <div className='w-full h-[3.5rem]'>{topbar}</div>
      ) : (
        <div className='w-full h-[3.5rem] bg-bgDarkLight'>topbar</div>
      )}
      {body ? (
        <div className='flex justify-center items-center w-full h-full box-border py-8 px-[4.5rem]'>
          {body}
        </div>
      ) : (
        <div className='flex justify-center items-center w-full h-full box-border py-8 px-[4.5rem] bg-bgDark'>
          body
        </div>
      )}
    </div>
  );
};

export default StartLayout;
