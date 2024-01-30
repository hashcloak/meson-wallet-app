import Spacer from '~/utils/Spacer';

// TODO: This needs to be dynamically change based on the props
const Notification: React.FC = () => {
  return (
    <div className='w-[30rem] h-[11rem] rounded-2xl bg-bgGrayMid dark:bg-bgDarkMid px-8 py-6'>
      <span className='text-textGray dark:text-textWhite text-xl font-bold'>
        Notifications
      </span>
      <Spacer size={24} axis={'vertical'} />
      <div className='flex flex-col justify-center items-center w-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
          fill='#ffffff'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M13.11 5.72l-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 18H9.34c-.18 0-.34-.16-.34-.34V9.82l4.11-4.1M14 2L7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.83C7 18.95 8.05 20 9.34 20h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2zM4 9H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1z' />
        </svg>
        <span className='text-lg text-textWhite'>No notifications</span>
      </div>
    </div>
  );
};

export default Notification;
