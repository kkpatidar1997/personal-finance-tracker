import { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../services/api';

const TransactionList = ({ token }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(token);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id, token);
      fetchTransactions();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="mt-6 bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-4">Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{tx.category} - {tx.type}</p>
              <p className="text-sm text-gray-500">${tx.amount} on {new Date(tx.date).toLocaleDateString()}</p>
              {tx.notes && <p className="text-sm text-gray-400 italic">"{tx.notes}"</p>}
            </div>
            <button
              onClick={() => handleDelete(tx._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
