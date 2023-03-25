import RowBodyLong from './RowBodyLong'
import RowBodyShort from './RowBodyShort'
import { StatusTypes } from '@/components/molecules/IconText/TxStatus'

export { RowBodyLong, RowBodyShort }

export type RowBodyType = {
  amount?: number | string
  token?: string
  to?: string
  from?: string
  timestamp: number
  status: StatusTypes
  numOfConfirmation?: number
  isSuccess?: boolean
}
