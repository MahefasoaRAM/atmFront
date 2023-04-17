import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'


function Withdraw() {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    sender_id: localStorage.getItem('id'),
    amount:'',
    nature: 2,
  })
  
  const handle = (e) => {
    e.persist()
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      amount: input.amount,
      sender_id: input.sender_id,
      nature: input.nature
    }
    setLoading(true)
    axios.post(`/api/withdraw/${localStorage.getItem('id')}.${localStorage.getItem('account')}`, data).then(res => {
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
          <h1 className='text-center text-capitalize mb-4'>Withdraw</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="form-group mb-3">
                  <label className="text-capitalize">amount</label>
                  <input type="number" min="0" step="any" name="amount" className='form-control' onChange={handle} value={input.amount} />
                </div>
                <div className="form-group text-center">
                  <button type='submit' className='btn btn-primary text-capitalize'>withdraw</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw