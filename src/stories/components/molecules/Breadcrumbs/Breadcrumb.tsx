import { Icon } from '../../atoms/Icon/Icon'
import CustomLink from '../../atoms/Link/CustomLink'

import Spacer from '~/utils/Spacer'

const Breadcrumb = () => {
  return (
    <div className='text-base text-textWhite flex flex-row justify-center items-center'>
      <CustomLink url={'https://'} size={'base'} text={'Transactions'} />
      <Spacer size={8} axis={'horizontal'} />
      <Icon type={'ArrowForward'} size={'sm'} color={'white'} />
      <Spacer size={8} axis={'horizontal'} />
      <span>Details</span>
    </div>
  )
}

export default Breadcrumb
