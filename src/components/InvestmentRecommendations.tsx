import React from 'react'
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const InvestmentRecommendations: React.FC = () => {
  const investingRecommendation = useSelector((state: RootState) => state.recommendations.investingRecommendation);


  const recommendations = [
    {
      title: 'S&P 500',
      description: 'A diversified index that tracks the performance of 500 large companies in the U.S.',
    },
    {
      title: 'NASDAQ-100',
      description: 'An index that includes 100 of the largest non-financial companies listed on the NASDAQ stock market.',
    },
    {
      title: 'Dow Jones Industrial Average',
      description: 'A stock market index that tracks 30 large, publicly-owned companies in the U.S.',
    },
  ]

  return (
    <div className='p-6 rounded-lg bg-gray-700 m-6'>
      <p className='mb-6 text-lg font-bold'>AI recomendations:</p>
      <ul>
        <li className="mb-10">
          <h3 className="text-md font-semibol mb-2 underline">{investingRecommendation.product}</h3>
          <p className='text-sm'>- {investingRecommendation.desc}</p>
        </li>
      </ul>
    </div>
  )
}

export default InvestmentRecommendations