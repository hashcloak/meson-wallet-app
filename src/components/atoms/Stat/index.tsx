import React from 'react';

type Props = {
  title: 'queue' | 'historied';
  data: number;
};

const Stat: React.FC<Props> = ({ title, data }) => {
  const statTitle = {
    queue: 'Total queued txs',
    historied: 'Total historied txs',
  };

  return (
    <div className='stats bg-transparent'>
      <div className='stat flex flex-col justify-center items-center'>
        <div className='stat-title text-textGrayLight font-bold'>
          {statTitle[title]}
        </div>
        <div className='stat-value text-textWhite'>{data}</div>
      </div>
    </div>
  );
};

export default Stat;
