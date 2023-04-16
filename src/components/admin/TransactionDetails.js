import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function TransactionDetails(props) {
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState([])
  const id = props.match.params.id


  useEffect(() => {
    fetch(id)
  }, [id])

  const fetch = (id) => {
    axios.get(`/api/transactiondetails/${id}`).then(res => {
      if(res.data.status === 200){
        console.log(id)
        console.log(res.data.transactiondetails)
        setTest(res.data.transactiondetails)
        setLoading(false)
        console.log(test)
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
    <div className='container mt-5'>
    <div className='d-flex flex-row-reverse'>
        <Link to='/adminatm/transaction' className='btn btn-info'>Back</Link>
      </div>
      <div className="card">
        <div className="card-body">
          {/* <h1 className="text-center text-capitalize">{transaction.naturetransaction} du {transaction.created_at}</h1>
          <p className="card-title">De la part de {transaction.sender.name}  pour {transaction.receiver.name}</p>
          <p>La valeur de {transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</p> */}
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails