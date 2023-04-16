import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

function Transaction() {
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState([])
  const [order, setOrder] = useState('asc')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [search, setSearch] = useState('')

  const sort = (col) => {
    if(order === 'asc'){
      const sorted = [...transaction].sort((a, b) => a[col] > b[col] ? 1 : -1)
      setTransaction(sorted)
      setOrder('desc')
    }
    if(order === 'desc'){
      const sorted = [...transaction].sort((a, b) => a[col] < b[col] ? 1 : -1)
      setTransaction(sorted)
      setOrder('asc')
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const fetch = () => {
    axios.get(`/api/transactionlist/${localStorage.getItem('id')}.${localStorage.getItem('account')}`).then(res => {
      setTransaction(res.data.transaction)
      setLoading(false)
    })
  }

  const handleStart = (date) => {
    setStartDate(date)
  }

  const handleEnd = (date) => {
    setEndDate(date)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filtered = transaction.filter(item => {
    const itemDate = moment(item.created_at, 'YYYY-MM-DD')
    if(startDate && endDate && search !== ''){
      return (
        itemDate.isBetween(startDate, endDate, 'day', '[]') && (item.sender.name.toLowerCase().includes(search.toLowerCase()) || item.receiver.name.toLowerCase().includes(search.toLowerCase()) || item.naturetransaction.name.toLowerCase().includes(search.toLowerCase()))
      )
    } else if(startDate && endDate){
      return itemDate.isBetween(startDate, endDate, 'day', '[]')
    } else if(search !== ''){
      return item.sender.name.toLowerCase().includes(search.toLowerCase()) || item.receiver.name.toLowerCase().includes(search.toLowerCase()) || item.naturetransaction.name.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

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
          <div className="d-flex justify-content-around mb-3 form-group">
            <div className='d-flex align-items-center'>
              <div>Start : &nbsp;</div>
              <div><input type="date" className='form-control' onChange={(e) => handleStart(e.target.value)} /></div>
            </div>
            <div className='d-flex align-items-center'>
              <div>End : &nbsp;</div>
              <div><input type="date" className='form-control' onChange={(e) => handleEnd(e.target.value)} /></div>
            </div>
          </div>
          <div className="col-md-6 mb-3 m-auto">
            <input type="search" name="search" className='form-control rounded' onChange={handleSearch} placeholder='Search' />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr className="text-capitalize text-center">
                <th onClick={() => sort('sender')}><span className="btn fw-bold pe-none">sender</span></th>
                <th onClick={() => sort('amount')}><span className="btn fw-bold pe-none">amount</span></th>
                <th onClick={() => sort('receiver')}><span className="btn fw-bold pe-none">receiver</span></th>
                <th onClick={() => sort('reason')}><span className="btn fw-bold pe-none">reason</span></th>
                <th onClick={() => sort('date')}><span className="btn fw-bold pe-none">date</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                let date = new Date(item.created_at)
                return (
                <tr key={item.id} className='text-center'>
                  <td className="text-capitalize">{item.sender.name}</td>
                  <td className="text-capitalize">{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</td>
                  <td className="text-capitalize">{item.receiver.name}</td>
                  <td className="text-capitalize">{item.naturetransaction.name}</td>
                  <td className="text-capitalize">{date.toLocaleDateString()}</td>
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