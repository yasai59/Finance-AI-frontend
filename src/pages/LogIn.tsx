import React, { useState, ChangeEvent, FormEvent } from "react";
import { createAccount, logIn } from "../helpers/authHelpers";
import { showSuccessToast, showErrorToast } from "../helpers/toastHelper";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../store";

interface Investment {
  product: string;
  price: number;
  quantity: number;
}

export const LogIn: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Alternar entre iniciar sesión y registrarse
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Nuevo campo para verificar la contraseña
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        showErrorToast("Passwords do not match!");
        return;
      }
      createAccount({
        name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
        .then(() => {})
        .catch((error) => {
          showErrorToast("Error creating account: " + error.message);
        });
    } else {
      logIn({
        email: formData.email,
        password: formData.password,
      })
        .then(() => {})
        .catch((error) => {
          showErrorToast("Error logging in: " + error.message);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/60 to-blue-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white/85 text-black p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                key="firstName"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full px-4 py-2 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </motion.div>
            )}
            {isSignUp && (
              <motion.div
                key="lastName"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full px-4 py-2 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              className="w-full px-4 py-2 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="********"
              className="w-full px-4 py-2 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                key="confirmPassword"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="********"
                    className="w-full px-4 py-2 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </motion.div>
            )}
            g
          </AnimatePresence>
          <button
            type="submit"
            className="w-full bg-black hover:bg-black/75 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener el nombre del usuario desde el estado de Redux
  const userName = useSelector((state: RootState) => state.user.user?.name);

  const handleLogout = () => {
    dispatch(clearUser()); // Limpia el estado del usuario
    navigate("/login"); // Redirige al login
  };

  // Datos de ejemplo para las inversiones (simulando datos del backend)
  const investments: Investment[] = [
    { product: "AAPL", price: 150, quantity: 10 },
    { product: "GOOGL", price: 2800, quantity: 2 },
    { product: "AMZN", price: 3400, quantity: 1 },
    { product: "MSFT", price: 310, quantity: 5 },
    { product: "TSLA", price: 700, quantity: 3 },
  ];

  // Calcular el total invertido
  const totalInvested = investments.reduce((total, investment) => {
    return total + investment.price * investment.quantity;
  }, 0);

  const data = [
    { title: "Balance", value: "$12,345.67" },
    { title: "Invested", value: `$${totalInvested.toFixed(2)}` },
    { title: "Savings", value: "$5,432.10" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {userName || "User"}!</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-md shadow-md bg-gray-800 text-center"
          >
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Investments</h2>
        <ul className="space-y-2">
          {investments.map((investment, index) => (
            <li
              key={index}
              className="p-2 rounded-md shadow-sm bg-gray-800 flex justify-between items-center"
            >
              <div>
                <Link
                  to={`/investment/${investment.product}`}
                  className="text-md font-medium text-blue-400 hover:underline"
                >
                  {investment.product}
                </Link>
                <p className="text-xs mt-1">
                  Price: ${investment.price.toFixed(2)}
                </p>
                <p className="text-xs">Quantity: {investment.quantity}</p>
              </div>
              <p className="text-xs font-bold">
                Total: ${(investment.price * investment.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
