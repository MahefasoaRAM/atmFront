import React from 'react'

function Dashboard() {
  return (
    <div className='pt-5'>
    <div className="pt-5">
      <div className="pt-5">
        <div className="pt-5">
          <div className="pt-5">
            <h1 className='text-uppercase text-center fst-italic'>welcome to the dahsboard</h1>
            <h1 className='text-uppercase text-center'>{localStorage.getItem('name')}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard