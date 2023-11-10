// https://docs.chain.link/data-feeds/examples#javascript
import { Contract, BigNumber } from 'ethers';
import { getProvider } from './getProvider';
// eslint-disable-next-line import/extensions
import * as priceFeedAddress from '~/utils/priceFeedAddress.json';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const rateAddress = JSON.parse(JSON.stringify(priceFeedAddress)).default;

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const getPriceFeed = async (
  network = 'mainnet',
  currency = 'ETH/USD'
): Promise<BigNumber[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const ETH_USD_RATE_ADDRESS = rateAddress[network][currency] as string;

  let provider;
  if (network === 'mainnet') {
    provider = getProvider('homestead');
  } else {
    provider = getProvider(network);
  }

  const priceFeed = new Contract(
    ETH_USD_RATE_ADDRESS,
    aggregatorV3InterfaceABI,
    provider
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (await priceFeed.latestRoundData()) as BigNumber[];
};
