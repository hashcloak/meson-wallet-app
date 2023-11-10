import React from 'react';
import { mainnet, goerli } from '@wagmi/core';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const WagmiWalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new WalletConnectConnector({
      chains: [goerli, mainnet],
      options: {
        projectId: '68a8f8d01a597d867d9a8361edd65768',
      },
    }),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );

  return (
    <button
      className='bg-green-500 hover:bg-green-200 py-2 px-4 border-cyan-50 rounded-2xl'
      onClick={() => connect()}
    >
      WalletConnect
    </button>
  );
};

export default WagmiWalletConnect;
