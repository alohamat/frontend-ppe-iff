import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Img from "./LinkImg";

import ExitImg from "../assets/exit.png"

function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-b from-green-700 to-green-800 flex flex-wrap items-center min-h-[60px] p-3 gap-x-4 flex-col lg:flex-row justify-between">
      <img
        src="src/assets/IFF-PC2.jpg"
        onClick={() => navigate("/main")}
        alt="IFF"
        className="hidden sm:block h-12 rounded-2xl cursor-pointer"
      />
      <img
        src="src/assets/IFF-MOBILE.jpg"
        onClick={() => navigate("/main")}
        alt="IFF"
        className="block sm:hidden h-12 rounded-2xl cursor-pointer"
      />
      <div className="flex gap-4">
        <Img src={ExitImg} alt="Sair" size="small"/>
      </div>
      <div className="flex justify-between w-full mt-2">
        <h1 className="text-lg sm:text-xl md:text-2xl text-white font-bold">
          Cardápio Digital
        </h1>
        {/* cumprimenta se autenticado */}
        {isAuthenticated ? (
          <p className="text-white text-lg sm:text-xl max-w-[180px] truncate font-bold">
            Olá, {user?.nome}!
          </p>
        ) : (
          <div className="ml-auto" />
        )}
      </div>
    </header>
  );
}

export default Header;