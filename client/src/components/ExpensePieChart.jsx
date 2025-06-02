import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F', '#A28CFF', '#FF6384'];

const ExpensePieChart = ({ transactions }) => {
  const expenses = transactions.filter(tx => tx.type === 'expense');

  const data = expenses.reduce((acc, tx) => {
    const existing = acc.find(item => item.name === tx.category);
    if (existing) {
      existing.value += tx.amount;
    } else {
      acc.push({ name: tx.category, value: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No expense data</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default ExpensePieChart;