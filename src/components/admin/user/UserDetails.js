import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserDetails(props) {
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState({
    name: '',
    phone:'',
    email:'',
    account: '',
    balance: '',
    pin: '',
  })

  const id = props.match.params.id

  useEffect(() => {
    fetch(id)
  }, [id])

  const fetch = (id) => {
    axios.get(`/api/userdetails/${id}`).then(res => {
      if(res.data.status === 200){
        setInput(res.data.user)
        setLoading(false)
      }
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
    <div className="container py-5">
    <div className='row justify-content-center'>
      <div className="col-md-6 py-5">
        <h1 className='text-center text-capitalize mb-4'>details user</h1>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label className="text-capitalize">name : {input.name}</label>
              </div>
              <div className="form-group mb-3">
                <label>Email : {input.email}</label>
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">phone : {input.phone}</label>
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">account : {input.account}</label>
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">balance : {input.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserDetails