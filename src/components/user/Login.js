import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function Login() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [input, setInput] = useState({
    account:'',
    pin:'',
    error:[],
  })

  const handle = (e) => {
    e.persist()
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      account: input.account,
      pin: input.pin,
    }
    axios.get('/sanctum/csrf-cookie').then(() => {
      setLoading(true)
      axios.post('/api/login', data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('$2y$10$Cjm6h7DV9IdbzMWC/2gouOrykQXqmjo5mtm4UGnePgJXyydeFBy36', res.data.token)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('account', res.data.account)
          localStorage.setItem('id', res.data.id)
          history.push('/account/dasshboard')
          swal('Success', res.data.message, 'success')
          setLoading(false)
        } else if(res.data.status === 401){
          swal('Warning', res.data.message, 'warning')
          setLoading(false)
        } else {
          setInput({...input, error: res.data.errors})
          setLoading(false)
        }
      })
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
    <div className='container py-5'>
      <div className="row justify-content-center">
        <div className="col-md-6 py-5">
          <div className="card">
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="form-group mb-3">
                  <label className="text-capitalize">credit card number</label>
                  <input type="text" name="account" className='form-control' onChange={handle} value={input.account} />
                  <span className="text-danger">{input.error.account}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="text-capitalize">pin code</label>
                  <input type="password" name="pin" className='form-control' onChange={handle} value={input.pin} />
                  <span className="text-danger">{input.error.pin}</span>
                </div>
                <div className="form-group text-center">
                  <button type='submit' className='btn btn-primary text-capitalize'>connexion</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login