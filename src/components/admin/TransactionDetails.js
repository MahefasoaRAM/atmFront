import React, { useEffect, useState } from 'react'
import axios from 'axios'

function TransactionDetails(props) {
    const [loading, setLoading] = useState(true)
    const [transaction, setTransaction] = useState(null)

    useEffect(() => {
        const id = props.match.params.id
        axios.get(`/api/transactiondetails/${id}`).then(res => {
            setTransaction(res.data.transactiondetails)
            setLoading(false)
        }, [props.match.params.id])
    })

    if(loading){
        return (
          <div className="d-flex justify-content-center container py-5">
            <div className="spinner-border text-primary my-5" role='status'></div>
          </div>
        )
      }

      let date = new Date(transaction.created_at)

  return (
    <div className="container py-5">
    <div className='row justify-content-center'>
      <div className="col-md-6 py-5">
        <h1 className='text-center text-capitalize mb-4'>details transaction</h1>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label className="text-capitalize">{transaction.naturetransaction.name} du {date.toLocaleDateString()}</label>
              </div>
              <div className="form-group mb-3">
                <label>De la part de : {transaction.sender.name}</label>
              </div>
              <div className="form-group mb-3">
                <label className="text-capitalize">pour : {transaction.receiver.name}</label>
              </div>
              <div className="form-group mb-3">
                <label>d'une valeur de : {transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TransactionDetails