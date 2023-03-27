import { Token } from '@/components/molecules/IconText'
import { TokenTypes } from '@/components/molecules/IconText/Token'
import { mockTokensVals } from '@/utils/Mock'
import Spacer from '@/utils/Spacer'

// TODO: This needs to be dynamically change based on the props
const Portfolio = () => {
  return (
    <div className='flex flex-col w-full'>
      <span className='text-textWhite text-2xl font-bold'>Portfolio</span>

      <div className='rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6 w-full h-full box-border'>
        <div className='flex flex-col items-center w-full'>
          <span className='text-3xl font-bold'>$ 100.00</span>
          <Spacer size={16} axis={'vertical'} />
          <div className='w-11/12'>
            {mockTokensVals.map((token) => (
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
                  <span className='text-textGrayLight text-sm'>≈ $ 100.00</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
