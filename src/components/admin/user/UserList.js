import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function UserList() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  
  useEffect(() =>{
    fetchdata()
  }, [])

  const fetchdata = () => {
    axios.get('/api/userlist').then(res => {
      setUser(res.data.user)
      setLoading(false)
    })
  }

  const userdelete = (id) => {
    axios.delete(`/api/userdelete/${id}`).then(res => {
      fetchdata()
    })
  }


  if(loading){
    return (
      <div className="d-flex justify-content-center container py-5">
        <div className="spinner-border text-primary my-5" role='status'></div>
      </div>
    )
  }

  return (
    <div className='container mt-5'>
    <div className='d-flex flex-row-reverse mb-3'>
      <Link to='/adminatm/useradd' className='btn btn-info'>Add user</Link>
    </div>
    <div className="card">
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center text-capitalize">
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>account number</th>
              <th>balance</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map(item => (
              <tr className="text-catipatlize text-center" key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.account}</td>
                <td>{item.balance}</td>
                <td className='d-flex justify-content-around'>
                  <Link to={`/adminatm/userdetails/${item.id}`} className='btn btn-info'>show</Link>
                  <Link to={`/adminatm/useredit/${item.id}`} className='btn btn-warning'>edit</Link>
                  <button onClick={() => userdelete(item.id)} className='btn btn-danger'>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default UserList