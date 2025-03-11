import React from 'react'
import TransactionsChart from '../../assets/Card1'
import {LuTrendingUpDown} from 'react-icons/lu'

const AuthLayout = ({children}) => {
  return (
    <div className=' flex items-center justify-center bg-gray-100 relative min-h-screen'>
        <div className='w-screen h-screen md:w-[60vw] px-22 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] bg-violet-50 h-100%'>
        <div className="grid grid-cols-1 z-20 absolute top-2 right-20">
          <StatusInfoCard 
          Icon = {<LuTrendingUpDown />}
          label = "Track your Income & Expenses"
          value = "430,000"
          color = "bg-primary"
          />
          
        </div>

        <TransactionsChart />
        </div>
    </div>
  )
}

export default AuthLayout

const StatusInfoCard = ({Icon, label, value, color}) => {
  return (
  <div className='flex gap-6 bg-white p-4 rounded-xl shadow-xl shadow-purple-400/10 border border-gray-200/50 '>
    <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
      {Icon}
    </div>
    <div>
      <h6 className='text-xs text-gray-500 nb-1'>{label}</h6>
      <span className='text-[20px]'>${value}</span>
    </div>
  </div>
  )
}