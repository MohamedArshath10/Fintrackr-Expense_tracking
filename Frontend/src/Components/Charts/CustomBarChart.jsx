import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

const CustomBarChart = ({ data }) => {

  // ✅ Corrected color function
  const getBarColor = (index) =>
    index % 2 === 0 ? "#6B21A8" : "#C084FC";

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg border border-gray-300 p-2'>
          <p className='text-xs font-semibold text-purple-800 mb-1'>
            {payload[0].payload.category}
          </p>
          <p className='text-sm text-gray-600'>
            Amount:{' '}
            <span className='text-sm font-medium text-gray-900'>
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='bg-white mt-6'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke='none' />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
          <Tooltip content={CustomToolTip} />
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart;
