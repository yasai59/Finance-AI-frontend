import React from 'react';
import { Link } from 'react-router-dom';
import InvestmentRecommendations from './InvestmentRecommendations';

interface InvestmentsListProps {
  acciones: { name: string; price: number | null }[];
}

const InvestmentsList: React.FC<InvestmentsListProps> = ({ acciones }) => {
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Investments</h2>
      <InvestmentRecommendations />
      
      <ul className="space-y-2">
        {acciones
          .filter((accion) => accion.price !== null)
          .map((accion, index) => (
            <li
              key={index}
              className="p-2 rounded-md shadow-sm bg-gray-800 flex justify-between items-center"
            >
              <Link
                to={`/product/${encodeURIComponent(accion.name)}`}
                className="text-sm font-medium truncate text-blue-400 hover:underline"
              >
                {accion.name}
              </Link>
              <span className="text-sm font-bold">${accion.price!.toFixed(2)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default InvestmentsList;