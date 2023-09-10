// import { StatusTypes } from '~/components/molecules/IconText/TxStatus';
import { StatusType } from '~/components/molecules/IconText/TxStatus';
import RowBodyLong from './RowBodyLong';
import RowBodyShort from './RowBodyShort';

export { RowBodyLong, RowBodyShort };

export type RowBodyType = {
  amount?: number | string;
  token?: string;
  to: string;
  from: string;
  timestamp: number;
  status: StatusType;
  numOfConfirmation?: number;
  isSuccess?: boolean;
};
