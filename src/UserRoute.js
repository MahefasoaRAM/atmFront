import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Master from './layouts/user/Master'

function UserRoute({...res}) {
  return (
    <Route {...res} 
        render = {({props, location}) =>
            (localStorage.getItem('$2y$10$Cjm6h7DV9IdbzMWC/2gouOrykQXqmjo5mtm4UGnePgJXyydeFBy36')) ? (<Master {...props} />) : (<Redirect to={{ pathname: '/login', state: {from: location} }} />)
        }
    />
  )
}

export default UserRoute