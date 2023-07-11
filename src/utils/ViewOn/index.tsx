import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '~/components/atoms/Icon';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';

type Props = {
  address: string;
};

const ViewOn: React.FC<Props> = ({ address }) => {
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  const url =
    network === 'localhost'
      ? ''
      : `https://${network}.etherscan.io/address/${address}`;

  return (
    <a href={url} className='tooltip' target='_blank' rel='noreferrer'>
      <Icon type={'OpenInNew'} size={'md'} color={'white'} />
    </a>
  );
};

export default ViewOn;
