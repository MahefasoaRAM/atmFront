import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Balance() {
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  const fetch = () => {
    axios.get(`/api/balance/${localStorage.getItem('id')}.${localStorage.getItem('account')}`).then(res => {
      setBalance(res.data.balance)
      setLoading(false)
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
    <div className='pt-5'>
      <div className="pt-5">
        <div className="pt-5">
          <div className="pt-5">
            <div className="pt-5">
              <h1 className='text-capitalize text-center fst-italic'>your balance is :</h1>
              <h1 className='text-capitalize text-center fw-bolder'>{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Balance