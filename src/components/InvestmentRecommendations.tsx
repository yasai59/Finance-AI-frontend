import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const InvestmentRecommendations: React.FC = () => {
  const investingRecommendation = useSelector(
    (state: RootState) => state.recommendations.investingRecommendation,
  );

  return (
    <div className="">
      <h3 className="text-lg font-semibold">
        <span className="text-blue-400">AI</span> recomendation:
      </h3>
      <div className="pl-2">
        <h3 className="text-md font-semibol mb-2 underline">
          {investingRecommendation?.product}
        </h3>
        <p className="text-sm">- {investingRecommendation?.desc}</p>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;
