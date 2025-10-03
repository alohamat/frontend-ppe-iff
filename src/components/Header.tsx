import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Img from "./LinkImg";
import QuickLinks from "./QuickLinks";

import ExitImg from "../assets/exit.png";

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header
      className="bg-gradient-to-b from-green-700 to-green-800 
                   flex items-center justify-between 
                   px-4 py-3 shadow-md flex-col sm:flex-row gap-2"
    >
      {/* logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/main")}
      >
        <img
          src="src/assets/IFF-PC2.jpg"
          alt="IFF"
          className="hidden sm:block h-12 rounded-xl"
        />
        <img
          src="src/assets/IFF-MOBILE.jpg"
          alt="IFF"
          className="block sm:hidden h-12 rounded-xl"
        />
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Cardápio Digital
        </h1>
      </div>

      {/* centro */}
      <div className="flex items-center gap-4">
          <p className="text-white font-bold sm:text-xl ">Olá, {user?.nome}!</p>
        <div className="flex gap-3 mt-1">
          {/* <button 
        onClick={() => navigate("/about")}
        className="text-green-100 hover:text-white underline text-sm">
        Sobre Nós
        </button> */}
        </div>
      </div>

      {/* direita */}
      <div className="flex items-center gap-4">
        <QuickLinks />
        {isAuthenticated && (
          <span className="flex justify-between w-full items-center">
            <Img src={ExitImg} alt="Sair" size="small" funcao={logout} />
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
