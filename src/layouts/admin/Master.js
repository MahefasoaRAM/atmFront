import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import admin from '../../routes/admin'

function Master() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          {admin.map((item, i) => {
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
          <Redirect from='/adminatm' to='adminatm/dashboard' />
        </Switch>
      </div>
      <Footer className='flex-shrink-1'/>
    </div>
  )
}

export default Master