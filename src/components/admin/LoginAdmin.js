import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

function LoginAdmin() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [input, setInput] = useState({
    email:'',
    password:'',
    error:[],
  })

  const handle = (e) => {
    e.persist()
    setInput({...input, [e.target.name]: e.target.value})
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      email: input.email,
      password: input.password,
    }
    axios.get('/sanctum/csrf-cookie').then(() => {
      setLoading(true)
      axios.post('/api/admin', data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('$2y$10$r6CY3AMyQ6cc2fnDm.MRku0.FqBvCxcNeDm/X/Fgk6DsffSOk/Xsa', res.data.token)
          localStorage.setItem('name', res.data.name)
          history.push('/adminatm/dashboard')
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
                <label className="text-capitalize">email</label>
                <input type="text" name="email" className='form-control' onChange={handle} value={input.email} />
                <span className="text-danger">{input.error.email}</span>
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">password</label>
                <input type="password" name="password" className='form-control' onChange={handle} value={input.password} />
                <span className="text-danger">{input.error.password}</span>
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

export default LoginAdmin