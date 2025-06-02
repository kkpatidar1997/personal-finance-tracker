// import { useEffect, useState } from 'react';
// import { getTransactions, deleteTransaction } from '../services/api';

// const TransactionList = ({ token }) => {
//   const [transactions, setTransactions] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const data = await getTransactions(token);
//       setTransactions(data);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteTransaction(id, token);
//       fetchTransactions();
//     } catch (error) {
//       console.error('Failed to delete transaction:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <div className="mt-6 bg-white rounded shadow p-4">
//       <h3 className="text-xl font-semibold mb-4">Transactions</h3>
//       <ul className="space-y-2">
//         {transactions.map((tx) => (
//           <li key={tx._id} className="flex justify-between items-center border-b pb-2">
//             <div>
//               <p className="font-medium">{tx.category} - {tx.type}</p>
//               <p className="text-sm text-gray-500">${tx.amount} on {new Date(tx.date).toLocaleDateString()}</p>
//               {tx.notes && <p className="text-sm text-gray-400 italic">"{tx.notes}"</p>}
//             </div>
//             <button
//               onClick={() => handleDelete(tx._id)}
//               className="text-red-600 hover:underline"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;


//  import { useEffect, useState } from 'react';
//  import { getTransactions, deleteTransaction } from '../services/api';

// const TransactionList = ({ transactions, setTransactions, token }) => {
//   const handleDelete = async (id) => {
//     try {
//       await deleteTransaction(id, token);
//       const updated = transactions.filter(tx => tx._id !== id);
//       setTransactions(updated);
//     } catch (error) {
//       console.error('Failed to delete transaction:', error);
//     }
//   };

//   return (
//     <div className="mt-6 bg-white rounded shadow p-4">
//       <h3 className="text-xl font-semibold mb-4">Transactions</h3>
//       {transactions.length === 0 ? (
//         <p className="text-gray-500 text-center">No transactions found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {transactions.map((tx) => (
//             <li key={tx._id} className="flex justify-between items-center border-b pb-2">
//               <div>
//                 <p className="font-medium">{tx.category} - {tx.type}</p>
//                 <p className="text-sm text-gray-500">
//                   ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
//                 </p>
//                 {tx.notes && <p className="text-sm text-gray-400 italic">"{tx.notes}"</p>}
//               </div>
//               <button
//                 onClick={() => handleDelete(tx._id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TransactionList;
// import { useState, useMemo } from 'react';
// import { deleteTransaction } from '../services/api';

// const TransactionList = ({ transactions, setTransactions, token }) => {
//   const [filterType, setFilterType] = useState('All');

//   const handleDelete = async (id) => {
//     try {
//       await deleteTransaction(id, token);
//       const updated = transactions.filter((tx) => tx._id !== id);
//       setTransactions(updated);
//     } catch (error) {
//       console.error('Failed to delete transaction:', error);
//     }
//   };

//   // Use memo to filter efficiently
//   const filteredTransactions = useMemo(() => {
//     if (filterType === 'All') return transactions;
//     return transactions.filter((tx) => tx.type === filterType);
//   }, [filterType, transactions]);

//   return (
//     <div className="mt-6 bg-white rounded shadow p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold">Transactions</h3>
//         <select
//           className="border rounded px-2 py-1"
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Income">Income</option>
//           <option value="Expense">Expense</option>
//         </select>
//       </div>

//       {filteredTransactions.length === 0 ? (
//         <p className="text-gray-500 text-center">No transactions found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {filteredTransactions.map((tx) => (
//             <li
//               key={tx._id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <div>
//                 <p className="font-medium">
//                   {tx.category} - {tx.type}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
//                 </p>
//                 {tx.notes && (
//                   <p className="text-sm text-gray-400 italic">"{tx.notes}"</p>
//                 )}
//               </div>
//               <button
//                 onClick={() => handleDelete(tx._id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TransactionList;
import { useState, useMemo } from 'react';
import { deleteTransaction } from '../services/api';

const TransactionList = ({ transactions, setTransactions, token }) => {
  const [filterType, setFilterType] = useState('All');



  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id, token);
      const updated = transactions.filter((tx) => tx._id !== id);
      setTransactions(updated);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const filteredTransactions = useMemo(() => {
    if (filterType === 'All') return transactions;
    return transactions.filter((tx) => tx.type?.toLowerCase() === filterType.toLowerCase());
  }, [filterType, transactions]);

  

  return (
    <div className="mt-6 bg-white rounded shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Transactions</h3>
        <select
          className="border rounded px-2 py-1"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTransactions.map((tx) => (
            <li
              key={tx._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {tx.category} - {tx.type}
                </p>
                <p className="text-sm text-gray-500">
                  ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
                </p>
                {tx.notes && (
                  <p className="text-sm text-gray-400 italic">"{tx.notes}"</p>
                )}
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


      )}
    

    </div>
  );
};

export default TransactionList;
