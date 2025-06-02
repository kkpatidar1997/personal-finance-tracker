import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const MonthlyBarChart = ({ transactions }) => {
  const grouped = {};

  transactions.forEach(tx => {
    const month = dayjs(tx.date).format('MMM YYYY');
    if (!grouped[month]) {
      grouped[month] = { month, income: 0, expense: 0 };
    }
    grouped[month][tx.type] += tx.amount;
  });

  const data = Object.values(grouped).sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No transactions to display</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00C49F" />
            <Bar dataKey="expense" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyBarChart;
