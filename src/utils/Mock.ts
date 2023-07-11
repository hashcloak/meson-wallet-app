import { EthereumAddress } from 'trezor-connect';
import { ContactType } from '~/components/organisms/ContactRow';
import { OwnerType } from '~/components/organisms/EditOwners';
import { RowBodyType } from '~/components/organisms/RowBody';

export const mockNetworks = [
  {
    value: 'localhost',
    label: 'Localhost',
    bg: 'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack',
    url: 'http://127.0.0.1:8545/',
    chainId: 31337,
  },
  {
    value: 'ethreaum',
    label: 'Ethereum',
    bg: 'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack',
  },
  {
    value: 'polygon',
    label: 'Polygon',
    bg: 'bg-[#8249E4] text-textWhite',
  },
  {
    value: 'goerli',
    label: 'Goerli',
    bg: 'bg-[#4C98EB] text-textWhite',
  },
  {
    value: 'bnb_smart_chain',
    label: 'BNB Smart Chain',
    bg: 'bg-[#F1B80B] text-textBlack',
  },
];

export const mockTransactions: RowBodyType[] = [
  {
    amount: '- 0.00062',
    token: 'Eth',
    to: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    from: undefined,
    timestamp: 1677055246,
    status: 'Send',
    numOfConfirmation: 1,
    isSuccess: false,
  },
  {
    amount: '+ 0.00062',
    token: 'Dai',
    to: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    from: undefined,
    timestamp: 1674376846,
    status: 'Send',
    numOfConfirmation: 1,
    isSuccess: false,
  },
  {
    amount: undefined,
    token: undefined,
    to: undefined,
    from: undefined,
    timestamp: 1674376846,
    status: 'OnChainRejection',
    numOfConfirmation: 1,
    isSuccess: false,
  },
];

export const mockOwners: OwnerType[] = [
  { address: '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7', name: 'Owner1' },
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: '' },
];

export const mockContacts: ContactType[] = [
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: 'test1' },
  { address: '0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E', name: 'Kang' },
];

export const mockTokens = [
  {
    value: 'ethereum',
    label: 'Ethereum',
    id: 'eth',
  },
  {
    value: 'dai',
    label: 'Dai',
    id: 'dai',
  },
  {
    value: 'usdc',
    label: 'USDC',
    id: 'usdc',
  },
  {
    value: 'bnb',
    label: 'BNB Binance',
    id: 'bnb',
  },
];

export const mockTokensVals = [
  { type: 'EthLogo', abbrev: 'ETH', token: 'Ethereum', amount: '0.080' },
  {
    type: 'DaiLogo',
    abbrev: 'DAI',
    token: 'Dai Stablecoin',
    amount: '0.00000',
  },
  { type: 'UsdcLogo', abbrev: 'USDC', token: 'USD Coin', amount: '0.00000' },
  {
    type: 'BnbLogo',
    abbrev: 'BNB',
    token: 'BNB Smart Chain',
    amount: '0.00000',
  },
];

export const mockLastOpenedWallets = [
  {
    id: 1,
    walletName: 'My wallet',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1674012686,
  },
  {
    id: 2,
    walletName: 'Sample wallet2',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1649565211,
  },
  {
    id: 6,
    walletName: 'Sample wallet6',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1674011500,
  },
  {
    id: 3,
    walletName: 'Sample wallet4',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1660970011,
  },
  {
    id: 5,
    walletName: 'Sample wallet3',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1665376411,
  },
  {
    id: 4,
    walletName: 'Sample wallet',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1662784411,
  },
];

export const mockTrezorAccounts: EthereumAddress[] = [
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/0",
    address: '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/1",
    address: '0x033d1c7f7147A9109C2b758F09c2b9B258cfF063',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/2",
    address: '0x9d15bc47B6c2db762f191E370e4Af5B1f2914AD0',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/3",
    address: '0x52411Da3aB0F1268b11160E342D27A5167e1729C',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/4",
    address: '0x12fdE4B42d1183120233c4862630A33d36dD45a4',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/5",
    address: '0x4375eE6f9bDc99a3C226d84882D768E09D556b7E',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/6",
    address: '0xfdd93A3F8C868d26761F24F03dc27e65d95A6786',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/7",
    address: '0xf6075D099784A5b398486E6C2e09Fd19B83533e7',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/8",
    address: '0xC742296F3f0C83924484Be7FC5DC9D142A722dAB',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/9",
    address: '0x15dD28EE02f5dD5e03dD313d59dC4354F868f75c',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/10",
    address: '0x380352d75F1cf6e4A976a7FEbC1074512f82d318',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/11",
    address: '0x078828D57fDA92Ba532B8F524d65681B7dc6401D',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/12",
    address: '0xb9347180244c4194cc4722c52666Abc6931FB0d1',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/13",
    address: '0x5D18318376890dB4FAD841D56F1B17409eA49DAA',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/14",
    address: '0x5B473Aa25dDB85d4ABAEe9FF7104536202f1e73f',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/15",
    address: '0x40D3d745eDc89e357Ed6532AEd65A08eCA763635',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/16",
    address: '0xdA426b91D3C932C2608E5eF89FEE60dda183b399',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/17",
    address: '0x9F576De84ec616339F9b7C643ed5E285663798d2',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/18",
    address: '0x669F5B2C7A938Cc135FE548a48afa575528D77A6',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/19",
    address: '0x5f17D7Ea9469f452F13A7743b4B64460172F6830',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/20",
    address: '0x395e63B40c4E4407fdb9860b33222f23630Cd4c3',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/21",
    address: '0xDfEF11e124E0B7EdA1b2A203a4Bde9A386704986',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/22",
    address: '0x54F460f23889462E9B6b071B3ee968e98294Ec80',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/23",
    address: '0xeda37907c39c5f574b3A0709dc9152b86d5cA9c6',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/24",
    address: '0xc4CD7D8c6Fa695b54C39df8Eb78ff243E6167AAa',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/25",
    address: '0x7BAeC352E8B361cf38Ae7A063961EB9b1733894f',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/26",
    address: '0x5C344aA1d4cE3361Be8cD8B570ac0Fc43F58E447',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/27",
    address: '0x8D7413077835e7601235050F83343552A0e2f849',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/28",
    address: '0x48954Da24ABA0349a4dB8c117A61F65c6F710223',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/29",
    address: '0xd12a3e939f05e741d926344A72a9856B090FB1cf',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/30",
    address: '0x613189795b9D26289E8bf764034325975cbfa741',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/31",
    address: '0x26B2871f2f1eb55DE48C71B68cE92850ae5870Ba',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/32",
    address: '0x86C98c4dE1226D66fE2B2777e5aa84c311164001',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/33",
    address: '0x5d60318E72921d0bCAD5fb3A569bD963aD368a42',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/34",
    address: '0x2c2163DF4aF5F4e392C636E07e745618b3169B16',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/35",
    address: '0x49c8118463cb9bf419BcFB207fC5D3F309522339',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/36",
    address: '0xAE2fB52b9c00d2D9D8782a0ef2467c22Fa66AF05',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/37",
    address: '0x3379adfeb9B976d8A95aF42408f3Ed02A5F855A9',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/38",
    address: '0x6CE30Ffa54551FCc8CB4bD8c00b6180b4A77Eb19',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/39",
    address: '0xB55590E289133e41524838F8534BF7cddE049784',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/40",
    address: '0x1AdE87Ec556f238084Cec251273101729d8cc2b5',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/41",
    address: '0x2d2296a1E1d0d4633eFCfcD2D1A47B1aC4404956',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/42",
    address: '0x924e81758EF1dEC017E1d5a5F5aD173cb7245b14',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/43",
    address: '0x2bf4b723f8c1910133eeE0aFA54CA429Fc7F033C',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/44",
    address: '0xa221aFfeAE3Ad9D99435Ac8c302f58cAba69354F',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/45",
    address: '0xF8B3A2b1f85551205b70242aF591C3fAefbd3d14',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/46",
    address: '0x2CEC01EdE5646a295d7C8FdD4B10Aa1D877Be131',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/47",
    address: '0xEC3306096e2BA049247EeeEE170C82eB8EAe40fc',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/48",
    address: '0x332B8CB0eD0C12c0B42F1aa616b6Ab8c4fC2be19',
  },
  {
    path: [2147483692, 2147483708, 2147483648, 0, 0],
    serializedPath: "m/44'/60'/0'/0/49",
    address: '0x2333478Fed8b29bd46240Ca27Db33d8C66F6FC6E',
  },
];
