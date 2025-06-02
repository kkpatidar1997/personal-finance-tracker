


import { useEffect, useState } from 'react';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionList from '../components/TransactionList';
import ExpensePieChart from '../components/ExpensePieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import { getTransactions } from '../services/api';

import Navbar from '../components/Navbar';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getTransactions(token);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionAdded = () => {
    fetchData();
  };

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Dashboard</h1>

        <AddTransactionForm token={token} onTransactionAdded={handleTransactionAdded} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionList token={token} />
          </div>
          <div className="space-y-6">
            <ExpensePieChart transactions={transactions} />
            {/* <BudgetManager token={token} /> */}
          </div>
        </div>

        <div>
          <MonthlyBarChart transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
