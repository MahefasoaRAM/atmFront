import Dashboard from '../components/user/Dashboard'
import Balance from '../components/user/Balance'
import Deposit from '../components/user/Deposit'
import Transaction from '../components/user/Transaction'
import Transfer from '../components/user/Transfer'
import Withdraw from '../components/user/Withdraw'

const user = [
    { path: '/account', exact: true, name: 'Account' },
    { path: '/account/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/account/balance', exact: true, name: 'Balance', component: Balance },
    { path: '/account/deposit', exact: true, name: 'Deposit', component: Deposit },
    { path: '/account/transaction', exact: true, name: 'Transaction', component: Transaction },
    { path: '/account/transfer', exact: true, name: 'Transfer', component: Transfer },
    { path: '/account/withdraw', exact: true, name: 'Withdraw', component: Withdraw },
]

export default user