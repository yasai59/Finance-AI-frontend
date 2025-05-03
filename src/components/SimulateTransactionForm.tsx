import React from 'react';
import { Transaction } from '../pages/Dashboard';

interface SimulateTransactionFormProps {
  formData: Transaction;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SimulateTransactionForm: React.FC<SimulateTransactionFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Simulate Transaction</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={onInputChange}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="entry">Entry</option>
            <option value="save">Save</option>
          </select>
        </div>
        {(formData.type === 'buy' || formData.type === 'sell') && (
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <input
              type="text"
              name="product"
              value={formData.product || ''}
              onChange={onInputChange}
              placeholder="e.g., AAPL"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={onInputChange}
            placeholder="e.g., 10"
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SimulateTransactionForm;