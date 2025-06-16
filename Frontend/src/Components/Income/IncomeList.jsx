import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg'>Income Sources</h3>
        <button className='card-btn' onClick={onDownload}> <LuDownload className='text-base'/> Download</button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions.map((income) => (
          <TransactionInfoCard 
            key={income._id}
            title={income.source}
            date={moment(income.date).format("DD MM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default IncomeList