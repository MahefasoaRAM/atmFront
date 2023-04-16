import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function TransactionDetails(props) {
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState([])
  const id = props.match.params.id


  // useEffect(() => {
  //   fetch(id)
  // }, [id])

  const fetch = (id) => {
    axios.get('/api/transactiondetails/'+id).then(res => {
      setTransaction(res.data.transaction)
      setLoading(false)
      console.log(id)
      console.log(transaction)
    })
  }

  // var send = ''
  // transaction.map(el => {
  //   return send = el.sender.name
  // })
  // var rec = ''
  // transaction.map(el => {
  //   return rec = el.receiver.name
  // })
  // var amount = ''
  // transaction.map(el => {
  //   return amount = el.amount
  // })
  // var nature = ''
  // transaction.map(el => {
  //   return nature = el.naturetransaction.name
  // })
  // var date = ''
  // transaction.map(el => {
  //   return date = el.created_at
  // })


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
          {/* <h1 className="text-center text-capitalize">{nature} du {date.toLocaleDateString()}</h1>
          <p className="card-title">De la part de {send}  pour {rec}</p>
          <p>La valeur de {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</p> */}
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails