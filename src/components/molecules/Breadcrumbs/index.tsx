import CustomLink from '@/components/atoms/CustomLink'
import { Icon } from '@/components/atoms/Icon'
import Spacer from '@/utils/Spacer'

const Breadcrumb = () => {
  return (
    <div className='text-base text-textWhite flex flex-row items-center'>
      <CustomLink url={'https://'} size={'base'}>
        Transactions
      </CustomLink>
      <Spacer size={8} axis={'horizontal'} />
      <Icon type={'ArrowForward'} size={'sm'} color={'white'} />
      <Spacer size={8} axis={'horizontal'} />
      <span>Details</span>
    </div>
  )
}

export default Breadcrumb
