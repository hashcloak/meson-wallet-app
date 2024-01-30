// import Link from 'next/link'
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '~/components/molecules/Footer';
import { SidebarIconText } from '~/components/molecules/IconText';
import Stepper from '~/components/molecules/Stepper';
import NewTx from '~/components/organisms/NewTx';
import Spacer from '~/utils/Spacer';

type Props = {
  isStepper?: boolean;
  isCreateNew?: boolean;
  currentStep?: number;
};

const Sidebar: React.FC<Props> = ({
  isStepper = false,
  isCreateNew,
  currentStep,
}) => {
  return (
    <div className='flex flex-col items-center justify-between w-[5.5rem] h-full box-border py-4 bg-bgGrayMid dark:bg-bgDarkMid'>
      {isStepper ? (
        <Stepper
          isCreateNew={isCreateNew as boolean}
          currentStep={currentStep as number}
        />
      ) : (
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <Link to={'/dashboard'}>
              <SidebarIconText type={'Home'} text={'Home'} />
            </Link>
            <Link to='/transactions'>
              <SidebarIconText type={'Transactions'} text={'Transactions'} />
            </Link>
            <Link to='/contacts'>
              <SidebarIconText type={'Contacts'} text={'Contacts'} />
            </Link>
            <Link to='/settings'>
              <SidebarIconText type={'Settings'} text={'Settings'} />
            </Link>
            <SidebarIconText type={'Help'} text={'Help'} />
            <NewTx />
          </div>
          <div>
            <SidebarIconText type={'AddCircle'} text={'Add new'} />
            <Spacer size={16} axis={'vertical'} />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
