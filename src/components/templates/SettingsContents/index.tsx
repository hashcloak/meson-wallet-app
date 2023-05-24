import { VerticalTabs } from '~/components/molecules/Tabs';
import GeneralSettings from './GeneralSettings';
import WalletSettings from './WalletSettings';

const SettingsContents: React.FC = () => {
  const tabList: Array<{ [key: string]: JSX.Element }> = [
    { General: <GeneralSettings /> },
    { 'Wallet details': <WalletSettings /> },
  ];

  return (
    <>
      <VerticalTabs tabList={tabList} />
    </>
  );
};

export default SettingsContents;
