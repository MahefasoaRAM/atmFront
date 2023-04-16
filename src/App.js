import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import AdminRoute from './AdminRoute'
import UserRoute from './UserRoute'
import LoginAdmin from './components/admin/LoginAdmin'
import Login from './components/user/Login'

axios.defaults.baseURL= 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true
axios.interceptors.request.use(function(config){
  var token = ''
  if(!localStorage.getItem('$2y$10$Cjm6h7DV9IdbzMWC/2gouOrykQXqmjo5mtm4UGnePgJXyydeFBy36')){
    token = localStorage.getItem('$2y$10$r6CY3AMyQ6cc2fnDm.MRku0.FqBvCxcNeDm/X/Fgk6DsffSOk/Xsa')
  } else {
    token = localStorage.getItem('$2y$10$Cjm6h7DV9IdbzMWC/2gouOrykQXqmjo5mtm4UGnePgJXyydeFBy36')
  }
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AdminRoute path='/adminatm' name='admin' />
          <Route path='/adminlogin'>
            {(localStorage.getItem('$2y$10$r6CY3AMyQ6cc2fnDm.MRku0.FqBvCxcNeDm/X/Fgk6DsffSOk/Xsa')) ? <Redirect to='/adminatm'/> : <LoginAdmin/>}
          </Route>
          <UserRoute path='/account' name='account' />
          <Route path='/'>
            {(localStorage.getItem('$2y$10$Cjm6h7DV9IdbzMWC/2gouOrykQXqmjo5mtm4UGnePgJXyydeFBy36')) ? <Redirect to='/account'/> : <Login/>}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
