import React from 'react';

interface SummaryCardsProps {
  balance: number;
  invested: number;
  savings: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ balance, invested, savings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-4 rounded-md shadow-md bg-gray-800 text-center">
        <h2 className="text-lg font-medium">Balance</h2>
        <p className="text-xl font-bold mt-1">${balance.toFixed(2)}</p>
      </div>
      <div className="p-4 rounded-md shadow-md bg-gray-800 text-center">
        <h2 className="text-lg font-medium">Invested</h2>
        <p className="text-xl font-bold mt-1">${invested.toFixed(2)}</p>
      </div>
      <div className="p-4 rounded-md shadow-md bg-gray-800 text-center">
        <h2 className="text-lg font-medium">Savings</h2>
        <p className="text-xl font-bold mt-1">${savings.toFixed(2)}</p>
      </div>
      <div className="p-4 rounded-md shadow-md bg-gray-800 text-center">
        <h2 className="text-lg font-medium">Total</h2>
        <p className="text-xl font-bold mt-1">${(balance + invested + savings).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SummaryCards;