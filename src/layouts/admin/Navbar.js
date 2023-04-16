import React from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function Navbar() {
  const history = useHistory()
  const logout = (e) => {
    e.preventDefault()
    axios.post('/api/adminlogout').then(res => {
      if(res.data.status === 200){
        localStorage.clear()
        swal('Success', res.data.message, 'success')
        history.push('/adminatm')
      }
    })
  }
  
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className="container-fluid">
        <button className="navbar-toggler" type='button' data-bs-toggle='collapse' data-bs-target='navcontent' aria-controls='navcontent' aria-expanded='false' aria-label='Toggle navigation'><span className='navbar-toggler-icon'></span></button>
        <div className="collapse navbar-collapse" id='navcontent'>
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className='nav-link active text-capitalize' to='/adminatm/dashboard'>dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active text-capitalize' to='/adminatm/transaction'>transaction</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active text-capitalize' to='/adminatm/userlist'>user</Link>
            </li>
          </ul>
          <button className='btn btn-outline-light text-capitalize' onClick={logout}>logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar