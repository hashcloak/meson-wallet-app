/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react';
import { useRequest } from '@walletconnect/modal-sign-react';
import { SignClient as Connector } from '@walletconnect/sign-client';
import { BytesLike, ethers } from 'ethers';
import { concat, hexlify } from 'ethers/lib/utils.js';
import { useDispatch, useSelector } from 'react-redux';
// import { useAccount } from 'wagmi';
import * as json from '../../service/smart_contract/SmartWalletLogic.json';
import { setError } from '~/features/error';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';
import { getProvider } from '~/service';

type ReturnedType = {
  deployWCTx:  () => Promise<void>;
}

export const useWalletConnectSendTx = (
  network: string,
  signerWalletAddress: string
): ReturnedType => {
  // const { connector } = useAccount();
  const { session } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );
  const { request } = useRequest({
    topic: session !== undefined ? session : '',
    chainId: 'eip155:5',
    request: {
      method: 'eth_sendTransaction',
      params: [
        {
          from: signerWalletAddress,
          // to: signerWalletAddress,
          data: '0x',
          nonce:'0x00',
          gasPrice: '0xbb5e',
          gas: '0x5208',
          value: '0x00',
          amount: '23',
        },
      ],
    },
  });
  const dispatch = useDispatch();

  const deployWCTx = async() => {
    const abi = json.abi;
    const binary: BytesLike = json.bytecode.object;
    const entryPoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
    const iFace = new ethers.utils.Interface(abi);
    const deploymentData = iFace.encodeDeploy([entryPoint]) as BytesLike;
    const txData = hexlify(concat([binary, deploymentData]));
    const provider = getProvider(network);
    const nonce = await provider.getTransactionCount(signerWalletAddress);
    const latestBlock = await provider.getBlock('latest');
    try {
      console.log('start');

      const response = await request({
        topic: session !== undefined ? session : '',
        chainId: 'eip155:5',
        jsonrpc: '2.0',
        request: {
          method: 'eth_sendTransaction',
          params: [
            {
              from: signerWalletAddress,
              to: signerWalletAddress,
              data: '0x',
              nonce,
              gasPrice: '0xbb5e',
              gas: '0x5208',
              value: '0x00',
              amount: '23',
              symbol: 'Usdt'
            },
          ],
        },
      });
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError({ error: error.message }));
      }
    }
  }


  // useEffect(() => {
  //   const load = async () => {

  //     //   const txParams = {
  //     //    to: '',
  //     //    from: signerWalletAddress,
  //     //    nonce,
  //     //    gasLimit: latestBlock.gasLimit,
  //     //    gasPrice: Number(9000000000),
  //     //    data: txData,
  //     //    value: ethers.utils.parseEther('0'),
  //     //    chainId: 5,
  //     //  };
  //     // const newConnector = await Connector.init({
  //     //   projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  //     // });

  //     // const cachedSessions = [...newConnector.session.map].map(
  //     //   ([key, value]) => ({ key, value })
  //     // );
  //     // console.log('cachedSessions', cachedSessions[0]);

  //     // const walletConnectProvider = await newConnector?.getProvider();
  //     // const test = await newConnector.request({
  //     //   topic: cachedSessions[0].value.topic,
  //     //   chainId: 'eip155:5',
  //     //   request: {
  //     //     method: 'eth_sendTransaction',
  //     //     params: [
  //     //       {
  //     //         from: signerWalletAddress,
  //     //         data: '0x',
  //     //         nonce,
  //     //         gasPrice: '895440',
  //     //         gasLimit: latestBlock.gasLimit,
  //     //         value: '0x',
  //     //       },
  //     //     ],
  //     //   },
  //     // });

  //   };
  //   void load();
  // }, []);
  return { deployWCTx }
};
