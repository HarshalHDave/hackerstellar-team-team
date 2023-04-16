// component
import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Users',
    path: '/dashboard/applicants',
    icon: icon('ic_applicants'),
  },
  {
    title: 'Investments',
    path: '/dashboard/investments',
    icon: icon('ic_bonds'),
  },
  {
    title: 'Active Users',
    path: '/dashboard/users',
    icon: icon('ic_cart'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/my-transactions',
    icon: icon('ic_transaction'),
  },
  {
    title: 'Mint NFT',
    path: '/dashboard/mint-nft',
    icon: icon('ic_crypto'),
  }
  // {
  //   title: 'Space Management',
  //   path: '/dashboard/my-spaces',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'Outbound Prediction',
  //   path: '/dashboard/my-spaces',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
