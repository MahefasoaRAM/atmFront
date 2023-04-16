import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Master from './layouts/admin/Master'

function AdminRoute({...res}) {
  return (
    <Route {...res}
        render = {({props, location}) =>
            (localStorage.getItem('$2y$10$r6CY3AMyQ6cc2fnDm.MRku0.FqBvCxcNeDm/X/Fgk6DsffSOk/Xsa')) ? (<Master {...props} />) : (<Redirect to={{ pathname: '/adminlogin', state: {from: location} }} />)
        }
    />
  )
}

export default AdminRoute