import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

function UserAdd() {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    name: '',
    phone:'',
    email:'',
    account: '',
    balance: '',
    pin: '',
  })

  const handle = (e) => {
    e.persist()
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      name: input.name,
      phone: input.phone,
      email: input.email,
      account: input.account,
      balance: input.balance,
      pin: input.pin,
    }
    setLoading(true)
    axios.post(`/api/useradd`, data).then(res => {
      if(res.data.status === 401){
        swal('Warning', res.data.message, 'warning')
        setLoading(false)
      } else if(res.data.status === 200){
        swal('Success', res.data.message, 'success')
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
        <h1 className='text-center text-capitalize mb-4'>add user</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group mb-3">
                <label className="text-capitalize">name</label>
                <input type="text" name="name" className='form-control' onChange={handle} value={input.name} />
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">email</label>
                <input type="text" name="email" className='form-control' onChange={handle} value={input.email} />
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">phone</label>
                <input type="text" name="phone" className='form-control' onChange={handle} value={input.phone} />
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">account</label>
                <input type="text" name="account" className='form-control' onChange={handle} value={input.account} />
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">balance</label>
                <input type="number" min="0" step="any" name="balance" className='form-control' onChange={handle} value={input.balance} />
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">pin</label>
                <input type="password" name="pin" className='form-control' onChange={handle} value={input.pin} />
              </div>
              <div className="form-group text-center">
                <button type='submit' className='btn btn-primary text-capitalize'>add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserAdd