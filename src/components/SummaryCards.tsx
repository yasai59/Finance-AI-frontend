import React from "react";

interface SummaryCardsProps {
  balance: number;
  invested: number;
  savings: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  balance,
  invested,
  savings,
}) => {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-2.5 justify-center items-center w-1/4 bg-white/90 text-black backdrop-blur-md mx-auto rounded-3xl py-16">
        <h2 className="font-bold text-lg">Balance</h2>
        <p className="text-4xl">${balance.toFixed(2)}</p>
      </div>
      <div className="flex justify-around items-center w-8/12 mx-auto">
        <div className="flex flex-col justify-center items-center bg-white/75 backdrop-blur-xl w-[30%] py-14 shadow-xl hover:shadow-white/25 hover:scale-105 rounded-3xl text-black hover:bg-white/90 transition-all duration-300">
          <h2 className="font-bold text-md">Invested</h2>
          <p className="text-3xl">${invested.toFixed(2)}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/75 backdrop-blur-xl w-[30%] py-14 shadow-xl hover:shadow-white/25 hover:scale-105 rounded-3xl text-black hover:bg-white/90 transition-all duration-300">
          <h2 className="font-bold text-md">Savings</h2>
          <p className="text-3xl">${savings.toFixed(2)}</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-white/75 backdrop-blur-xl w-[30%] py-14 shadow-xl hover:shadow-white/25 hover:scale-105 rounded-3xl text-black hover:bg-white/90 transition-all duration-300">
          <h2 className="font-bold text-md">Total</h2>
          <p className="text-3xl">
            ${(balance + invested + savings).toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
