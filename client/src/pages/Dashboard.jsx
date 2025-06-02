


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
            {/* <TransactionList token={token} /> */}
            {/* <TransactionList token={token} transactions={transactions} /> */}
            <TransactionList
  transactions={transactions}
  setTransactions={setTransactions}
  token={token}
/>
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


// import { useEffect, useState } from 'react';
// import AddTransactionForm from '../components/AddTransactionForm';
// import TransactionList from '../components/TransactionList';
// import ExpensePieChart from '../components/ExpensePieChart';
// import MonthlyBarChart from '../components/MonthlyBarChart';
// import { getTransactions } from '../services/api';
// import Navbar from '../components/Navbar';

// const Dashboard = () => {
//   const token = localStorage.getItem('token');
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const data = await getTransactions(token);
//       setTransactions(data);
//     } catch (error) {
//       console.error('Failed to fetch transactions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleTransactionAdded = () => {
//     fetchData();
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-center sm:text-left text-gray-800">
//           📊 Dashboard Overview
//         </h1>

//         <section className="bg-white shadow-md rounded-lg p-4 sm:p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">➕ Add New Transaction</h2>
//           <AddTransactionForm token={token} onTransactionAdded={handleTransactionAdded} />
//         </section>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <section className="lg:col-span-2 bg-white shadow-md rounded-lg p-4 sm:p-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">📄 Transaction List</h2>
//             {loading ? (
//               <p className="text-gray-500">Loading transactions...</p>
//             ) : (
//               <TransactionList
//                 transactions={transactions}
//                 setTransactions={setTransactions}
//                 token={token}
//               />
//             )}
//           </section>

//           <div className="space-y-6">
//             <section className="bg-white shadow-md rounded-lg p-4 sm:p-6">
//               <h2 className="text-xl font-semibold mb-4 text-gray-700">📌 Expenses Breakdown</h2>
//               <ExpensePieChart transactions={transactions} />
//             </section>
//           </div>
//         </div>

//         <section className="bg-white shadow-md rounded-lg p-4 sm:p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">📅 Monthly Overview</h2>
//           <MonthlyBarChart transactions={transactions} />
//         </section>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
