import React from "react";
import { Link } from "react-router-dom";
import InvestmentRecommendations from "./InvestmentRecommendations";

interface InvestmentsListProps {
  acciones: { name: string; price: number | null }[];
}

const InvestmentsList: React.FC<InvestmentsListProps> = ({ acciones }) => {
  return (
    <div className="w-1/2 mx-auto flex flex-col gap-5 rounded-lg bg-white/85 text-black px-5 py-6">
      <h2 className="text-xl font-semibold">Investments</h2>
      <InvestmentRecommendations />

      <ul className="space-y-2 text-black">
        {acciones
          .filter((accion) => accion.price !== null)
          .map((accion, index) => (
            <li key={index} className="">
              <Link
                to={`/product/${encodeURIComponent(accion.name)}`}
                className="text-md truncate font-semibold hover:underline p-2 rounded-md bg-black/5 flex justify-between items-center hover:bg-black/15 transition-colors duration-300"
              >
                {accion.name}
                <span className="text-sm font-bold">
                  ${accion.price!.toFixed(2)}4
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default InvestmentsList;
