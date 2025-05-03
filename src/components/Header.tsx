import React from "react";

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header
      className="w-full flex justify-center ite
      />ms-center fixed top-0 left-0 ring-0"
    >
      <div className="flex justify-end w-full mx-auto pt-10 pr-10">
        <button
          onClick={onLogout}
          className="bg-white/90 text-black rounded-xl px-3 py-2.5 hover:brightness-75 transition duration-300 ease-in-out cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
