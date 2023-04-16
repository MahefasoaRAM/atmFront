import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import user from '../../routes/user'

function Master() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          {user.map((item, i) => {
            return (
              item.component && (
                <Route 
                  key={i}
                  path={item.path}
                  exact={item.exact}
                  name={item.name}
                  render={(props) => (
                    <item.component {...props} />
                  )}
                />
              )
            )
          })}
          <Redirect from='/account' to='/account/dashboard' />
        </Switch>
      </div>
      <Footer className='flex-shrink-1' />
    </div>
  )
}

export default Master