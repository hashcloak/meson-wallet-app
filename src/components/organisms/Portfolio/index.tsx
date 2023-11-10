import { TextLoader } from '~/components/atoms/Loader';
import { Token } from '~/components/molecules/IconText';
import { TokenTypes } from '~/components/molecules/IconText/Token';
import Spacer from '~/utils/Spacer';
import { useLoadPortfolio } from '~/hooks/useLoadPortfolio';

type Props = { background?: 'bg-bgDarkMid' | 'bg-bgDarkLight' };

// TODO: This needs to be dynamically change based on the props
const Portfolio: React.FC<Props> = ({ background = 'bg-bgDarkMid' }) => {
  const { isLoading, tokens, totalAsset } = useLoadPortfolio();

  return (
    <div className='flex flex-col w-full min-w-[32.5rem]'>
      <span className='text-textWhite text-2xl font-bold'>Portfolio</span>

      <div
        className={`rounded-2xl text-textWhite px-8 py-6 w-full h-full box-border ${background}`}
      >
        <div className='flex flex-col items-center w-full'>
          {isLoading ? (
            <TextLoader />
          ) : (
            <span className='text-3xl font-bold'>
              ${' '}
              {totalAsset.toLocaleString(undefined, {
                maximumFractionDigits: 20,
              })}
            </span>
          )}
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
                  {isLoading ? (
                    <TextLoader />
                  ) : (
                    <span className='text-textGrayLight text-sm'>
                      ≈ ${' '}
                      {token.fiatPrice
                        ? Number(token.fiatPrice).toLocaleString(undefined, {
                            maximumFractionDigits: 20,
                          })
                        : 0}
                    </span>
                  )}
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
