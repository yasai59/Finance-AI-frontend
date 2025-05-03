  import React from 'react';

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Welcome, {userName || 'User'}!</h1>
      <button
        onClick={onLogout}
        className="bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;