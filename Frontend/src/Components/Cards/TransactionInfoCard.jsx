import React from 'react'
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuBriefcase,
//   LuHomeIcon,
  LuShoppingCart,
  LuDollarSign,
  LuCar,
  LuHeart,
  LuGift,
} from 'react-icons/lu'

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
  // Icon mapping by category/source
  const getIconByTitle = (title = '') => {
    const lower = title.toLowerCase()

    const iconMap = {
      salary: <LuBriefcase />,
      freelance: <LuDollarSign />,
      food: <LuUtensils />,
    //   rent: <LuHome />,
      shopping: <LuShoppingCart />,
      car: <LuCar />,
      health: <LuHeart />,
      gift: <LuGift />,
    }

    return iconMap[lower] || <LuDollarSign /> // default icon
  }

  // Styling for amount box
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'

  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50'>
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
        {getIconByTitle(title)}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{title}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
            <button
              className='text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              onClick={onDelete}
            >
              <LuTrash2 size={14} />
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className='text-xs font-medium'>
              {type === 'income' ? '+' : '-'} ₹{amount}
            </h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard
