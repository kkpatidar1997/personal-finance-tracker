

import { useState, useEffect } from 'react';
import { getBudgets, setBudget } from '../services/api';
import dayjs from 'dayjs';

const categories = ['Food', 'Transport', 'Utilities', 'Shopping', 'Entertainment'];

const BudgetManager = ({ token }) => {
  const [budgets, setBudgets] = useState([]);
  const [newBudgets, setNewBudgets] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch budgets on mount
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets(token);
        setBudgets(data);
      } catch (err) {
        console.error('Failed to fetch budgets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, [token]);

  // Handle input change
  const handleChange = (category, value) => {
    setNewBudgets(prev => ({
      ...prev,
      [category]: Number(value),
    }));
  };

  // Submit all new budgets
  const handleSubmit = async () => {
    const month = dayjs().format('YYYY-MM');
    try {
      await Promise.all(
        Object.entries(newBudgets).map(([category, amount]) =>
          setBudget({ category, amount, month }, token)
        )
      );
      alert('Budgets updated!');
      // Refresh
      const updated = await getBudgets(token);
      setBudgets(updated);
      setNewBudgets({});
    } catch (err) {
      alert('Failed to update budgets.');
    }
  };

  // Helper to get current budget amount
  const getBudgetForCategory = category => {
    const entry = budgets.find(b => b.category === category);
    return entry ? entry.amount : 0;
  };

  if (loading) return <p>Loading budgets...</p>;

  return (
    <div className="bg-white p-4 rounded shadow mt-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Set Monthly Budgets</h2>
      {categories.map(cat => (
        <div key={cat} className="flex items-center justify-between mb-3">
          <label className="w-32 font-medium">{cat}</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-28"
            placeholder={`Ex: ${getBudgetForCategory(cat)}`}
            value={newBudgets[cat] || ''}
            onChange={e => handleChange(cat, e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Save Budgets
      </button>
    </div>
  );
};

export default BudgetManager;
