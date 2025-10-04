import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header
      className="bg-gradient-to-b from-green-700 to-green-800 
                   flex flex-col sm:flex-row items-center justify-between 
                   px-4 py-3 shadow-md gap-2"
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
      </div>
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Cardápio Digital
        </h1>

      {/* centro */}
      <div className="flex items-center gap-4">
        { isAuthenticated && (
          <p className="text-white font-bold sm:text-xl ">Olá, {user?.nome}!</p>
        )}
        <div className="flex gap-3 mt-1">
          {/* <button 
        onClick={() => navigate("/about")}
        className="text-green-100 hover:text-white underline text-sm">
        Sobre Nós
        </button> */}
        </div>
      </div>

      {/* direita */}
    </header>
  );
}

export default Header;
