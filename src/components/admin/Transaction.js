import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Transaction() {
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  const fetch = () => {
    axios.get(`/api/transactionlist`).then(res => {
      setTransaction(res.data.transaction)
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
    <div className='container mt-5'>
    <div className="card">
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr className="text-capitalize text-center">
              <th><span className="btn fw-bold pe-none">sender</span></th>
              <th><span className="btn fw-bold pe-none">amount</span></th>
              <th><span className="btn fw-bold pe-none">receiver</span></th>
              <th><span className="btn fw-bold pe-none">reason</span></th>
              <th><span className="btn fw-bold pe-none">date</span></th>
              <th><span className="btn fw-bold pe-none">actions</span></th>
            </tr>
          </thead>
          <tbody>
            {transaction.map(item => {
              let date = new Date(item.created_at)
              return (
              <tr key={item.id} className='text-center'>
                <td className="text-capitalize">{item.sender.name}</td>
                <td className="text-capitalize">{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</td>
                <td className="text-capitalize">{item.receiver.name}</td>
                <td className="text-capitalize">{item.naturetransaction.name}</td>
                <td className="text-capitalize">{date.toLocaleDateString()}</td>
                <td className="text-capitalize"><Link to={`/adminatm/transactiondetails/${item.id}`} className='btn btn-info'>show</Link></td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Transaction