/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NetworkState, NetworksState, setNetwork } from '~/features/network';
import { RootState } from '~/features/reducers';
import * as networksJson from '~/utils/networkList.json';

const SelectNetwork: React.FC = () => {
  const networks = JSON.parse(JSON.stringify(networksJson))
    .default as NetworksState;
  const network = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  const dispatch = useDispatch();

  const handleNetworkSelect = (currentVal: keyof NetworksState) => {
    dispatch(setNetwork(networks[currentVal]));
  };

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-48 w-full'>
        <select
          className={`form-select
          block
          w-full
          h-6
          px-6
          text-sm
          text-justify
          border-borderGray
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-blue-600
          focus:outline-none
          bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4]
        text-textBlack
          appearance-none
          `}
          aria-label='Default select example'
          onChange={(e) => {
            handleNetworkSelect(e.target.value as keyof NetworksState);
          }}
          // defaultValue={network && network ? network : "localhost"}
          value={network.network}
        >
          {Object.keys(networks).map((networkName) => (
            <option value={networkName} key={networkName} className="mx-auto">
              {networkName.charAt(0).toUpperCase() + networkName.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectNetwork;
