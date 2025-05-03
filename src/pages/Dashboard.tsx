import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { RootState } from "../store";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import TransactionsList from "../components/TransactionsList";
import SimulateTransactionForm from "../components/SimulateTransactionForm";
import InvestmentsList from "../components/InvestmentsList";
import { addTransaction, postTransaction } from "../redux/TransactionSlice";
import GeneralStatistics from "../components/GeneralStatistics";
import GeneralRecommendations from "../components/GeneralRecommendations";

export interface Transaction {
  type: "buy" | "sell" | "entry" | "save";
  product?: string;
  quantity: number;
  date: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.user.user?.name);
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions,
  ); // Obtener transacciones del slice

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const acciones = [
    { name: "TSLA", price: 287.21 },
    { name: "SQQQ", price: 28.61 },
    { name: "TQQQ", price: 59.43 },
    { name: "NVDA", price: 114.5 },
    { name: "SOXS", price: 17.03 },
    { name: "SOXL", price: 13.29 },
    { name: "AAPL", price: 205.35 },
    { name: "TSM", price: 179.28 },
    { name: "QQQ", price: 488.83 },
    { name: "AMZN", price: 189.98 },
    { name: "AMD", price: 98.8 },
    { name: "MSFT", price: 435.28 },
    { name: "SDOW", price: 50.93 },
    { name: "COMS", price: null },
    { name: "XELA", price: 1.15 },
    { name: "VOO", price: 520.71 },
    { name: "GMBL", price: null },
    { name: "BOIL", price: 65.89 },
    { name: "UVXY", price: 27.71 },
    { name: "VTI", price: 278.8 },
    { name: "SPY", price: 566.76 },
    { name: "GOOGL", price: 164.03 },
    { name: "TLT", price: 87.73 },
    { name: "BABA", price: 125.76 },
  ];

  const [balance, setBalance] = useState(0);
  const [savings, setSavings] = useState(0);
  const [invested, setInvested] = useState(0);
  const [formData, setFormData] = useState<Transaction>({
    type: "buy",
    product: "",
    quantity: 0,
    date: "",
  });
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    let newBalance = 0;
    let newSavings = 0;
    let newInvested = 0;

    transactions.forEach((transaction) => {
      const accion = acciones.find((a) => a.name === transaction.product);

      switch (transaction.type) {
        case "buy":
          if (accion) {
            newInvested += accion.price! * transaction.quantity;
            newBalance -= accion.price! * transaction.quantity;
          }
          break;
        case "sell":
          if (accion) {
            newInvested -= accion.price! * transaction.quantity;
            newBalance += accion.price! * transaction.quantity;
          }
          break;
        case "entry":
          newBalance += transaction.quantity;
          break;
        case "save":
          newSavings += transaction.quantity;
          newBalance -= transaction.quantity;
          break;
        default:
          break;
      }
    });

    setBalance(newBalance);
    setSavings(newSavings);
    setInvested(newInvested);
  }, [transactions, acciones]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el producto exista en la lista de acciones para transacciones de tipo 'buy' y 'sell'
    if (
      (formData.type === "buy" || formData.type === "sell") &&
      !acciones.some((accion) => accion.name === formData.product)
    ) {
      alert(
        "El producto seleccionado no es válido. Por favor, elige un producto de la lista de acciones.",
      );
      return;
    }

    // Convertir formData al tipo Transaction
    const transaction: Transaction = {
      type: formData.type,
      product: formData.product || "",
      quantity: formData.quantity,
      date: formData.date || "",
    };

    // Hacer un POST de la transacción y agregarla al estado global
    // @ts-ignore
    dispatch(postTransaction(transaction));
    setFormVisible(false);
    // Limpiar el formulario
    setFormData({ type: "buy", product: "", quantity: 0, date: "" });
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black/60 to-blue-900 py-36 bg-fixed">
      <div className="flex flex-col gap-20">
        <Header userName={userName} onLogout={handleLogout} />
        <SummaryCards balance={balance} invested={invested} savings={savings} />
        <GeneralStatistics />
        <TransactionsList transactions={transactions} />
        <SimulateTransactionForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          formVisible={formVisible}
          setFormVisible={setFormVisible}
        />
        <GeneralRecommendations />
        <InvestmentsList acciones={acciones} />
        <div className="fixed bottom-10 right-10">
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-white/90 text-black rounded-xl px-10 py-5 hover:brightness-75 transition duration-300 ease-in-out cursor-pointer"
          >
            New Operation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
