import React from "react";
import { Transaction } from "../pages/Dashboard";

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  return (
    <div className="flex flex-col gap-10 w-1/2 mx-auto bg-white/85 text-black rounded-3xl px-8 py-10 shadow-lg">
      <h2 className="font-semibold text-3xl">Latests movements</h2>
      <div className="flex flex-col justify-center gap-5">
        <ul className="flex flex-col gap-2.5">
          {transactions.map((transaction, index) => {
            let borderColor = "border-gray-600";
            let title = "";

            switch (transaction.type) {
              case "buy":
                borderColor = "border-green-500";
                title = `Buy ${transaction.product}`;
                break;
              case "sell":
                borderColor = "border-red-500";
                title = `Sell ${transaction.product}`;
                break;
              case "entry":
                borderColor =
                  transaction.quantity > 0
                    ? "border-blue-500"
                    : "border-yellow-500";
                title = transaction.quantity > 0 ? "Deposit" : "Withdrawal";
                break;
              case "save":
                borderColor =
                  transaction.quantity > 0
                    ? "border-purple-500"
                    : "border-orange-500";
                title =
                  transaction.quantity > 0 ? "Save" : "Savings Withdrawal";
                break;
              default:
                break;
            }

            return (
              <li key={index} className="rounded-xl overflow-hidden bg-black/5">
                <div
                  className={`${borderColor} border-l-8 px-2.5 flex justify-between items-center py-3`}
                >
                  <div className="flex flex-col">
                    <h3 className="font-bold ">{title}</h3>
                    <p className="text-sm text-gray-500">
                      {transaction.date || "No date provided"}
                    </p>
                  </div>
                  <p className="text-lg">{transaction.quantity}$</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {transactions.length} transactions
          </p>
          <div className="flex gap-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Buy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Sell</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Deposit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Withdrawal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-500">Save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
