import LoaderFailed from './LoaderFailed';
import LoaderSuccess from './LoaderSuccess';
import LoaderWaiting from './LoaderWaiting';

type Props = {
  isLoading: boolean;
  isSuccess: boolean;
  body?: React.ReactElement;
};

const Loader: React.FC<Props> = ({ isLoading, isSuccess }) => {
  if (isLoading && !isSuccess) {
    return <LoaderWaiting isLoading={isLoading} />;
  } else if (isSuccess) {
    return <LoaderSuccess isLoading={isLoading} />;
  } else if (!isSuccess) {
    return <LoaderFailed isLoading={isLoading} />;
  } else {
    return null;
  }
};

export default Loader;
