import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postTransaction } from '../redux/TransactionSlice'; // Importa la acción postTransaction
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axiosClient from '../helpers/axiosClient';

interface Transaction {
  type: 'buy' | 'sell';
  product: string;
  quantity: number;
  date: string;
}

const RenderRecommendation = ({num}: {num: Number | undefined}) => {
  if(num == 1){
    return <h3>Buy</h3>
  }
  if(num == 2){
    return <h3>Sell</h3>
  }
  if(num == 3){
    return <h3>Hold</h3>
  }
  if(num == 4){
    return <h3>Don't buy</h3>
  }
  if(num == 5){
    return <h3>Not recommended for you</h3>
  }
  return <></>
}

const RenderProduct: React.FC = () => {
  const { productName } = useParams<{ productName: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook para despachar acciones
  const [recommendation, setRecommendation] = useState();
  useEffect(() => {
    axiosClient.get('/asset-recommendation/' + productName).then((res) => {
      setRecommendation(res.data.data);
    })
  }, [])
  
  let stocksData = useSelector((state: any) => state.stocks?.stocks.data)
  stocksData = stocksData.filter((stock: any) => stock.symbol == productName).map((stock: any) => {
    return {
      date: stock.date,
      price: stock.close
    }
  })

  // Estado para el formulario
  const [formData, setFormData] = useState<Transaction>({
    type: 'buy',
    product: productName || '',
    quantity: 0,
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseFloat(value) : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos estén completos
    if (!formData.product || !formData.quantity || !formData.date) {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    // Despachar la acción para hacer un POST de la transacción
    // @ts-ignore
    dispatch(postTransaction(formData));

    // Limpiar el formulario
    setFormData({ type: 'buy', product: productName || '', quantity: 0, date: '' });

    alert('Transaction submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Botón de Go Back */}
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold mb-4">Product: {productName}</h1>
      <div className="bg-gray-800 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Price Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stocksData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <RenderRecommendation num={recommendation}/>
      <div className="bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Simulate Transaction</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              readOnly
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              step="0.01"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 10.5"
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenderProduct;