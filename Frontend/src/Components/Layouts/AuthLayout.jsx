import React from 'react'
import TransactionsChart from '../../assets/Card1'

const AuthLayout = ({children}) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-screen h-screen md:w-[60vw] px-22 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
            {children}
        </div>

        <TransactionsChart />
    </div>
  )
}

export default AuthLayout