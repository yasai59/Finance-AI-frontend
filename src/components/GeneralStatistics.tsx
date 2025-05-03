import React from 'react';
import GeneralRecommendations from './GeneralRecommendations';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const GeneralStatistics: React.FC = () => {
  const financialScore = useSelector((state: RootState) => state.recommendations.financialScore);
  const riskScore = useSelector((state: RootState) => state.recommendations.riskScore);

  // Determinar la cara correspondiente al usuario (1 a 6)  
  const faceIndex = Math.ceil((financialScore / 100) * 6);

  const faces = ['😡', '😠', '😐', '🙂', '😊', '😁'];

  const explanation = [
    `this doesn't look good, you should start saving more money`,
    `you are not doing great, but you can improve`,
    `you are doing ok, but you can do better`,
    `you are doing good, keep it up`,
    `you are doing great, you should be proud of yourself`,
    `you are doing amazing, you should be very proud of yourself`,
  ]

  return (
    <div className="flex flex-col items-center justify-center bg-gray-700  rounded-lg m-10 p-6">
      <h2 className='text-2xl'>✨What does our AI says about you✨</h2>
    <div className="flex justify-center items-center space-x-4 background-gray-800 pt-4 rounded-lg">
      {faces.map((face, index) => (
        <div
        key={index}
        className={`text-4xl transition duration-300 ${
          index + 1 === faceIndex ? 'grayscale-0' : 'grayscale-100'
        }`}
        >
          {face}
        </div>
      ))}
    </div>
    <div className="text-white text-sm text-center m-4">
      <p>{explanation[faceIndex - 1]}</p>
    </div>
    <div className="text-white text-lg text-center mb-10">
      <p>Risk Score: {riskScore}/5</p>
    </div>
    <GeneralRecommendations />  
    </div>
  );
};

export default GeneralStatistics;
