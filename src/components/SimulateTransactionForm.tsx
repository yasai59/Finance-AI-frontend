import React from "react";
import { Transaction } from "../pages/Dashboard";

interface SimulateTransactionFormProps {
  formData: Transaction;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SimulateTransactionForm: React.FC<SimulateTransactionFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  formVisible,
  setFormVisible,
}) => {
  return (
    <>
      {formVisible ? (
        <div
          className="fixed z-20 w-full h-full bg-black/30 inset-0 text-black flex justify-center items-center"
          onClick={() => setFormVisible(false)}
        >
          <div
            className="w-1/2 bg-white flex flex-col gap-10 rounded-3xl p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-semibold">Simulate Transaction</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={onInputChange}
                  className="border p-1.5 rounded-md"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="entry">Entry</option>
                  <option value="save">Save</option>
                </select>
              </div>
              {(formData.type === "buy" || formData.type === "sell") && (
                <div className="flex flex-col gap-2">
                  <label>Product</label>
                  <input
                    className="p-1.5 rounded-lg border"
                    type="text"
                    name="product"
                    value={formData.product || ""}
                    onChange={onInputChange}
                    placeholder="e.g., AAPL"
                    required
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="rounded-lg p-1.5 border"
                  value={formData.quantity}
                  onChange={onInputChange}
                  placeholder="e.g., 10"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  className="border rounded-lg p-1.5"
                  value={formData.date || ""}
                  onChange={onInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="py-3 bg-black/90 rounded-lg w-full text-white hover:bg-black/75 transition-all duration-300 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SimulateTransactionForm;
