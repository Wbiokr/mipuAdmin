import Bundle from './bundle'
import Screen from './Screen'

const Home = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/other/Home').default)
      }, 'Home')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const User = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/userInformation/SearchUser').default)
      }, 'UserSearch')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const RechargeRecord = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/userInformation/RechargeRecord').default)
      }, 'RechargeRecord')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const BankList = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/userInformation/BankList').default)
      }, 'BankList')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const LoanDetail = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/loanList/LoanDetail').default)
      }, 'LoanDetail')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const LoanList = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/loanList/LoanList').default)
      }, 'LoanList')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const RoleList = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/powerManage/RolesList').default)
      }, 'RoleList')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const RoleAdd = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/powerManage/RolesAdd').default)
      }, 'RoleAdd')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const RoleEdit = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/powerManage/RolesEdit').default)
      }, 'RoleEdit')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);

const RoleGroup = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/powerManage/RoleGroup').default)
      }, 'RoleGroup')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);
const RoleGroupAdd = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/powerManage/RoleGroupAdd').default)
      }, 'RoleGroupAdd')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);
const RoleGroupEdit = props => (
  <Bundle load={
    cb => {
      require.ensure([], require => {
        cb(require('../screens/powerManage/RoleGroupEdit').default)
      }, 'RoleGroupEdit')
    }
  }>
    {Com => <Com {...props} />}
  </Bundle>
);
export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/index',
    exact: true,
    component: Home,
  },
  {
    path: '/user',
    exact: true,
    component: User
  },
  {
    path: '/user/rechargeRecord/:userId',
    exact: true,
    component: RechargeRecord
  },
  {
    path: '/user/bankList/:userId',
    exact: true,
    component: BankList
  },
  {
    path: '/loan/loanDetail/:orderNo',
    exact: true,
    component: LoanDetail
  },
  {
    path: '/loan',
    exact: true,
    component: LoanList,
  },
  {
    path: '/power/roleList/list',
    exact: true,
    component: RoleList,
  },
  {
    path: '/power/roleList/add',
    exact: true,
    component: RoleAdd,
  },
  {
    path: '/power/roleList/edit/:id/:name/:status',
    exact: true,
    component: RoleEdit,
  },
  {
    path: '/power/roleGroup/group',
    exact: true,
    component: RoleGroup,
  },
  {
    path: '/power/roleGroup/add',
    exact: true,
    component: RoleGroupAdd,
  },
  {
    path: '/power/roleGroup/edit/:id/:name/:status',
    exact: true,
    component: RoleGroupEdit,
  },
]


