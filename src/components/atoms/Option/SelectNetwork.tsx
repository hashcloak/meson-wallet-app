import React, { useState } from 'react';
import { NetworksState } from '~/features/network';

type Props = {
  networks: NetworksState;
  handleChange?: (value: keyof NetworksState) => void;
};

const SelectNetwork: React.FC<Props> = ({ networks, handleChange }) => {
  const [currentVal, setCurrentVal] = useState<string>('');

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-96 w-full'>
        <select
          className={`form-select
          block
          w-full
          h-6
          px-6
          text-sm
          text-center
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
            setCurrentVal(e.target.value);
            handleChange?.(e.target.value as keyof NetworksState);
          }}
          defaultValue={currentVal}
        >
          {Object.keys(networks).map((networkName) => (
            <option value={networkName} key={networkName}>
              {networkName.charAt(0).toUpperCase() + networkName.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectNetwork;
