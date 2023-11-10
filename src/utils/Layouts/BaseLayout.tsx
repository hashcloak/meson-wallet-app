import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState, resetDisabling } from '~/features/loading';
import { RootState } from '~/features/reducers';

type Props = {
  topbar?: JSX.Element;
  sidebar?: JSX.Element;
  body?: JSX.Element;
};

const BaseLayout: React.FC<Props> = ({ topbar, sidebar, body }) => {
  const { isDisabling } = useSelector<RootState, LoadingState>(
    (state) => state.loading
  );
  const dispatch = useDispatch();

  const handleCursor =
    isDisabling !== undefined && isDisabling
      ? 'cursor-wait pointer-events-none'
      : 'cursor-default	pointer-events-auto';

  useEffect(() => {
    dispatch(resetDisabling());
  }, []);

  return (
    <div className={`w-full h-full flex flex-col ${handleCursor}`}>
      <div className='w-full h-[3.5rem] bg-bgDarkLight box-border'>
        {topbar}
      </div>
      <div className='flex flex-row w-full h-[calc(100vh_-_3.5rem)'>
        <div className='w-[5.5rem] box-border py-4 bg-bgDarkMid'>{sidebar}</div>
        <div className='w-[calc(100%-5.5rem)] h-[calc(100vh_-_3.5rem)] box-border py-8 px-[4.5rem] bg-bgDark overflow-scroll'>
          {body}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
