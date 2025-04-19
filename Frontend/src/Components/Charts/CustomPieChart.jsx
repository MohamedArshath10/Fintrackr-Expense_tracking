import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts'
import customTooltip from './customTooltip'
import CustomLegend from './CustomLegend'

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor
}) => {
  return (
    <ResponsiveContainer width="100%" height={360}>
        <PieChart>
            <Pie 
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                ))}
            </Pie>
            <Tooltip content={customTooltip}/>
            <Legend content={CustomLegend}/>
            {showTextAnchor && (
                <>
                    <text x="50%" y="50%" textAnchor="middle" fontSize="14px" dy={-25} fill='#666'>
                        {label}
                    </text>
                    <text x="50%" y="50%" textAnchor="middle" fontSize="24px" dy={8} fill='#333' fontWeight="semi-bold">
                        {totalAmount}
                    </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart