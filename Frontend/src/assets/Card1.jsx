import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', income: 100, expense: 60 },
  { name: 'Feb', income: 160, expense: 80 },
  { name: 'Mar', income: 250, expense: 140 },
  { name: 'Apr', income: 190, expense: 110 },
  { name: 'May', income: 90, expense: 40 },
  { name: 'Jun', income: 240, expense: 130 },
  { name: 'Jul', income: 300, expense: 170 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md">
        <p className="text-gray-700 font-semibold">{label}</p>
        <p className="text-indigo-500">Income: ${payload[0].value}</p>
        <p className="text-purple-500">Expense: ${payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const TransactionsChart = () => {
  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-lg max-w-lg mx-auto">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">All Transactions</h2>
        <button className="bg-purple-200 text-purple-700 px-3 py-1 rounded-lg text-sm">View More</button>
      </div>
      <p className="text-gray-400 text-sm">2nd Jan to 21th Dec</p>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'black' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="income" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="expense" stackId="a" fill="#c4b5fd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsChart;
