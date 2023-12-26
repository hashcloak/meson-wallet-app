/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/extensions */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRequest } from '@walletconnect/modal-sign-react';
import { ethers } from 'ethers';
import { hexlify } from 'ethers/lib/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { useControlWallet } from '../useControlWallet';
import { setError } from '~/features/error';
import { resetDisabling, resetLoading } from '~/features/loading';
import { MesonWalletState, setMesonWallet, setTimestamp } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { setToast } from '~/features/toast';
import { setWcWalletDeposit, wcWalletState } from '~/features/wcWallet';

type ReturnedType = {
  txReceipt: string | Error;
};

export const useWalletConnectDeploy = (
  signerWalletAddress: string
): ReturnedType => {
  const { deposit, session } = useSelector<RootState, wcWalletState>(
    (state) => state.wcWallet
  );
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { addNewWallet } = useControlWallet();
  const navigate = useNavigate();

  const [txReceipt, setTxReceipt] = useState<string | Error>('');
  const [wcIsSuccess, setWCIsSuccess] = useState(false);

  const { request } = useRequest({
    topic: session !== undefined ? session : '',
    chainId: 'eip155:5',
    request: {
      method: 'eth_sendTransaction',
      params: [
        {
          from: signerWalletAddress,
          to: mesonWallet?.mesonWalletAddress,
          data: '0x',
          gasPrice: '0xbb5e',
          gas: '0x5208',
          value:
            deposit !== undefined
              ? hexlify(ethers.utils.parseUnits(deposit, 'ether'))
              : '0',
        },
      ],
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (deposit !== undefined) {
      void deployWCTx();
    }
  }, [deposit]);

  const deployWCTx = async () => {
    try {
      const response: unknown = await request();
      setTxReceipt(response as string);
      setWCIsSuccess(true);
      dispatch(setToast({ message: 'Successfully deployed' }));
      dispatch(
        setMesonWallet({
          mesonWallet: {
            mesonWalletAddress: mesonWallet?.mesonWalletAddress,
            encryptedWallet: mesonWallet?.encryptedWallet,
            smartContract: response,
          },
        })
      );
      dispatch(setTimestamp());
      addNewWallet(mesonWallet!);

      setTimeout(() => {
        navigate('/dashboard');
        dispatch(resetLoading({ message: '' }));
      }, 5000);
    } catch (error) {
      setTxReceipt(error);
      dispatch(setError({ error: error.message }));
      dispatch(resetLoading({ message: '' }));
      dispatch(resetDisabling());
      dispatch(
        setWcWalletDeposit({
          deposit: undefined,
        })
      );
    }
  };

  return { txReceipt };
};
