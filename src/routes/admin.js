import Dashboard from '../components/admin/Dashboard'
import Transaction from '../components/admin/Transaction'
import TransactionDetails from '../components/admin/TransactionDetails'
import UserAdd from '../components/admin/user/UserAdd'
import UserDetails from '../components/admin/user/UserDetails'
import UserEdit from '../components/admin/user/UserEdit'
import UserList from '../components/admin/user/UserList'

const admin = [
    { path: '/adminatm', exact: true, name: 'Admin'},
    { path: '/adminatm/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/adminatm/transaction', exact: true, name: 'Transaction', component: Transaction },
    { path: '/adminatm/transactiondetails/:id', exact: true, name: 'TransactionDetails', component: TransactionDetails },
    { path: '/adminatm/useradd', exact: true, name: 'UserAdd', component: UserAdd },
    { path: '/adminatm/userdetails/:id', exact: true, name: 'UserDetails', component: UserDetails },
    { path: '/adminatm/useredit/:id', exact: true, name: 'UserEdit', component: UserEdit },
    { path: '/adminatm/userlist', exact: true, name: 'UserList', component: UserList },
]

export default admin