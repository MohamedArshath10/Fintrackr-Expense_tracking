import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts'

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
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart