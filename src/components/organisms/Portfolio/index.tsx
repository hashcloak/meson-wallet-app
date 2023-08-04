import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { Token } from '~/components/molecules/IconText';
import { TokenTypes } from '~/components/molecules/IconText/Token';
import { mockTokensVals } from '~/utils/Mock';
import Spacer from '~/utils/Spacer';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { useAssetPrice } from '~/hooks/useAssetPrice';
import { getProvider } from '~/service';
import { trimCurrency, trimEth } from '~/utils/trimDecimal';

// TODO: This needs to be dynamically change based on the props
const Portfolio: React.FC = () => {
  const [tokens, setTokens] = useState(mockTokensVals);
  const [totalAsset, setTotalAsset] = useState(0);

  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  const { conversionRate } = useAssetPrice();

  useEffect(() => {
    const load = async () => {
      try {
        if (mesonWallet) {
          const ethAddress = mesonWallet.address;
          const provider: ethers.providers.BaseProvider =
            getProvider('localhost');
          const currentEthBalance = await provider.getBalance(ethAddress);
          const eth = ethers.utils.formatUnits(currentEthBalance);

          const updatedEthVal = {
            type: 'EthLogo',
            abbrev: 'ETH',
            token: 'Ethereum',
            amount: trimEth(eth),
            fiatPrice: trimCurrency((Number(eth) * conversionRate).toString()),
          };

          setTokens((prevState) =>
            prevState.map((obj) => (obj.abbrev === 'ETH' ? updatedEthVal : obj))
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`error: ${error}`);
          throw new Error(error.message ?? error);
        }
      } finally {
        let currentAsset = 0;
        tokens.forEach((token) => {
          if (token.fiatPrice) {
            currentAsset = currentAsset + Number(token.fiatPrice);
          }
        });
        setTotalAsset(currentAsset);
      }
    };

    void load();
  }, [conversionRate]);

  return (
    <div className='flex flex-col w-full min-w-[32.5rem]'>
      <span className='text-textWhite text-2xl font-bold'>Portfolio</span>

      <div className='rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full box-border'>
        <div className='flex flex-col items-center w-full'>
          <span className='text-3xl font-bold'>$ {totalAsset}</span>
          <Spacer size={16} axis={'vertical'} />
          <div className='w-11/12'>
            {tokens.map((token) => (
              <div className='grid grid-cols-3 w-full mb-2' key={token.token}>
                <div className='col-span-1'>
                  <Token
                    type={token.type as TokenTypes}
                    abbrev={token.abbrev}
                    token={token.token}
                  />
                </div>
                <div className='col-span-1' />
                <div className='flex flex-col items-start col-span-1'>
                  <div className='flex flex-row text-base font-bold'>
                    <span>{token.amount}</span>
                    <Spacer size={8} axis={'horizontal'} />
                    <span>{token.abbrev}</span>
                  </div>
                  <span className='text-textGrayLight text-sm'>
                    ≈ $ {token.fiatPrice ? token.fiatPrice : 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
