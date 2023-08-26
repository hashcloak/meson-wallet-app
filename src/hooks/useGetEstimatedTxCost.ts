/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { BytesLike, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import * as json from '../service/smart_contract/SmartWalletLogic.json';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { getProvider } from '~/service';
import { trimEth } from '~/utils/trimDecimal';

type ReturnType = {
  estimatedTxCost: number;
  isFetching: boolean;
};

// TODO: Need to consider the logic
export const useGetEstimatedTxCost = (): ReturnType => {
  const [estimatedTxCost, setEstimatedTxCost] = useState<number>(0);
  const [isFetching, setIsFetching] = useState(false);
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  useEffect(() => {
    const load = async () => {
      setIsFetching(true);
      try {
        const provider = getProvider(network);
        const abi = json.abi;
        const binary: BytesLike = json.bytecode.object;

        const dummyWallet = ethers.Wallet.createRandom().connect(provider);

        // const gasPrice = await provider.getGasPrice();
        const contractFactory = new ethers.ContractFactory(
          abi,
          binary,
          dummyWallet
        );
        const deployTransaction = contractFactory.getDeployTransaction(
          await dummyWallet.getAddress()
        );
        const estimatedGas = await provider.estimateGas(deployTransaction);

        setEstimatedTxCost(
          Number(trimEth(ethers.utils.formatEther(estimatedGas)))
        );

        // const gasPrice = await provider.getGasPrice()
        // const gasEs = await provider.estimateGas({});
        // const estimated = Number(ethers.utils.formatEther(gasPrice)) * Number(ethers.utils.formatEther(gasEs))
        // console.log(ethers.utils.formatEther(gasEs));

        // 0.000023661447495
        // 0.000000000001406704
      } catch (error) {
        if (error instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`error: ${error}`);

          throw new Error(error.message ?? error);
        }
      } finally {
        setIsFetching(false);
      }
    };

    void load();
  }, []);

  return { estimatedTxCost, isFetching };
};
