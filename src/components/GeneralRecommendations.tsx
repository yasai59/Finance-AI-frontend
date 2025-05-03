import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const GeneralRecommendations: React.FC = () => {
  const recommendations = useSelector((state: RootState) => state.recommendations.recommendations);

  let nRecommendations = recommendations.map((r: any )=> {
    return {
      title: r.action,
      description: r.reason
    }
  })

  return (
    <div className="p-6 rounded-md border">
      <h2 className="text-xl font-bold text-white mb-6">General Recommendations</h2>
      <div className="grid grid-cols-2 gap-4">
        {nRecommendations .map((rec, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">{rec.title}</h3>
            <p className="text-sm text-gray-300">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralRecommendations;