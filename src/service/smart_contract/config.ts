const SEPOLIA_RPC_URL = import.meta.env.VITE_SEPOLIA_RPC_URL as string;
const SEPOLIA_PRIVATE_KEY = import.meta.env.VITE_SEPOLIA_PRIVATE_KEY as string;
const GOERLI_RPC_URL = import.meta.env.VITE_GOERLI_RPC_URL as string;
const GOERLI_PRIVATE_KEY = import.meta.env.VITE_GOERLI_PRIVATE_KEY as string;

export const config = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
    },
  },
};
