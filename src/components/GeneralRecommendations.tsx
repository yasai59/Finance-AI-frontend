import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const GeneralRecommendations: React.FC = () => {
  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations,
  );

  let nRecommendations = recommendations.map((r: any) => {
    return {
      title: r.action,
      description: r.reason,
    };
  });

  return (
    <div className="w-8/12 mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">
        General <span className="text-blue-400">AI</span> Recommendations
      </h2>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        {nRecommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white/85 px-5 rounded-xl py-6 shadow-md hover:shadow-lg transition duration-300 w-[49%] text-black"
          >
            <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
            <p className="text-sm">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralRecommendations;
