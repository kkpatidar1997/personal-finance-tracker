import { useState } from 'react';
import { addTransaction } from '../services/api';

const AddTransactionForm = ({ token, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    category: '',
    amount: '',
    date: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(formData, token);
      onTransactionAdded(); // refresh list after adding
      setFormData({ type: 'income', category: '', amount: '', date: '', notes: '' });
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label>Category</label>
        <input name="category" type="text" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>

      <div>
        <label>Amount</label>
        <input name="amount" type="number" value={formData.amount} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>

      <div>
        <label>Date</label>
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>

      <div>
        <label>Notes</label>
        <input name="notes" type="text" value={formData.notes} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
