import React from 'react';
import { Icon } from '~/components/atoms/Icon';

type Props = {
  address: string;
};

const ViewOn: React.FC<Props> = ({ address }) => {
  const selectedNetwork = 'goerli';

  return (
    <a
      href={`https://${selectedNetwork}.etherscan.io/address/${address}`}
      className='tooltip'
      target='_blank'
      rel='noreferrer'
    >
      <Icon type={'OpenInNew'} size={'md'} color={'white'} />
    </a>
  );
};

export default ViewOn;
