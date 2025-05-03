import React from 'react';
import { Transaction } from '../pages/Dashboard';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((transaction, index) => {
          let borderColor = 'border-gray-600';
          let title = '';

          switch (transaction.type) {
            case 'buy':
              borderColor = 'border-green-500';
              title = `Buy ${transaction.product}`;
              break;
            case 'sell':
              borderColor = 'border-red-500';
              title = `Sell ${transaction.product}`;
              break;
            case 'entry':
              borderColor = transaction.quantity > 0 ? 'border-blue-500' : 'border-yellow-500';
              title = transaction.quantity > 0 ? 'Deposit' : 'Withdrawal';
              break;
            case 'save':
              borderColor = transaction.quantity > 0 ? 'border-purple-500' : 'border-orange-500';
              title = transaction.quantity > 0 ? 'Save' : 'Savings Withdrawal';
              break;
            default:
              break;
          }

          return (
            <li
              key={index}
              className={`p-2 rounded-md shadow-sm bg-gray-800 border-l-4 ${borderColor} flex items-center justify-between`}
            >
              <div className="flex-1">
                <h3 className="text-sm font-medium truncate">{title}</h3>
                <p className="text-xs text-gray-400 truncate">
                  {transaction.date || 'No date provided'}
                </p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-sm font-bold">{transaction.quantity}$</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionsList;