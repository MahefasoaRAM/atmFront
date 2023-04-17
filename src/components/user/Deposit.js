import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

function Deposit() {
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState({
    sender_id: localStorage.getItem('id'),
    receiver:'',
    amount:'',
    nature: 1,
  })
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch()
  }, [])
  
  const fetch = () => {
    axios.get('/api/users').then(res => {
      setUsers(res.data.user)
      setLoading(false)
    })
  }

  const handle = (e) => {
    e.persist()
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      amount: input.amount,
      sender_id: input.sender_id,
      receiver: input.receiver,
      nature: input.nature
    }
    setLoading(true)
    axios.post(`/api/deposit/${localStorage.getItem('id')}.${localStorage.getItem('account')}`, data).then(res => {
      if(res.data.status === 401){
        swal('Warning', res.data.message, 'warning')
        setLoading(false)
      } else if(res.data.status === 200){
        swal('Success', res.data.message, 'success')
        setLoading(false)
      }
    })
  }

  const userlist = users.map(user => 
    (user.id === parseInt(localStorage.getItem('id'))) ? (<option key={user.id} value={user.id} className='text-capitalize'>mon compte</option>) : (<option key={user.id} value={user.id} className='text-capitalize'>{user.name}</option>)
    )

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
        <h1 className='text-center text-capitalize mb-4'>deposit</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={submit}>
              <div className="form-group mb-3">
                  <select name="receiver" value={input.receiver || ''} onChange={handle} className='text-capitalize form-select'>
                    <option className='text-capitalize' value=''>receiver</option>
                    {userlist}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="text-capitalize">amount</label>
                  <input type="number" min="0" step="any" name="amount" className='form-control' onChange={handle} value={input.amount} />
                </div>
                <div className="form-group text-center">
                  <button type='submit' className='btn btn-primary text-capitalize'>deposit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit