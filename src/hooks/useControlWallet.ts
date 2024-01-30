import { useDispatch, useSelector } from 'react-redux';
import { MesonWalletState, setAll } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import {
  WalletsState,
  WalletState,
  addWallet,
  removeWallet,
  updateMesonWallet,
} from '~/features/wallets';

type ReturnVal = {
  addNewWallet: (newMesonWallet: {
    mesonWalletAddress: string;
    smartContract: string;
    encryptedWallet: string;
  }) => void;
  updateWallet: (updatedMesonWallet: MesonWalletState) => void;
  removeSpecificWallet: (mesonWalletAddress: string) => void;
  switchWallet: (idx: number) => void;
  wallets: WalletState[] | [];
};

export const useControlWallet = (): ReturnVal => {
  const mesonWallet = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const network = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const { wallets } = useSelector<RootState, WalletsState>(
    (state) => state.wallets
  );
  const dispatch = useDispatch();

  const addNewWallet = (newMesonWallet: {
    mesonWalletAddress: string;
    encryptedWallet: string;
    smartContract: string;
  }) => {
    dispatch(
      addWallet({
        mesonWallet: {
          ...mesonWallet,
          mesonWallet: newMesonWallet,
        },
        network,
      })
    );
  };

  const updateWallet = (updatedMesonWallet: MesonWalletState) => {
    if (updatedMesonWallet !== undefined) {
      dispatch(updateMesonWallet(updatedMesonWallet));
    }
  };

  const removeSpecificWallet = (mesonWalletAddress: string) => {
    dispatch(removeWallet(mesonWalletAddress));
  };

  const switchWallet = (idx: number) => {
    console.log(wallets[idx].mesonWallet)
    dispatch(
      setAll(wallets[idx].mesonWallet)
    );
  };

  // useEffect(() => {
  //  addNewWallet()
  // }, []);

  return {
    addNewWallet,
    updateWallet,
    removeSpecificWallet,
    switchWallet,
    wallets,
  };
};
