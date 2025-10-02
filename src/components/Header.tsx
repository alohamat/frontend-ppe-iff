import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="bg-green-700 flex flex-wrap items-center min-h-[60px] p-3 gap-x-4">
      <img
        src="src/assets/IFF-PC2.jpg"
        onClick={() => navigate("/main")}
        alt="IFF"
        className="hidden sm:block h-12 rounded-full cursor-pointer"
      />
      <img
        src="src/assets/IFF-MOBILE.jpg"
        onClick={() => navigate("/main")}
        alt="IFF"
        className="block sm:hidden h-12 rounded-full cursor-pointer"
      />
      <h1 className="ml-2 text-lg sm:text-xl md:text-2xl text-white font-bold">
        Cardápio Digital
      </h1>
      {/* cumprimenta se autenticado */}
      {isAuthenticated ? (
        <div className="ml-auto flex items-center gap-4">
          <p className="text-white text-sm md:text-base max-w-[180px] truncate">
            Olá, {user?.nome}!
          </p>
        </div>
      ) : (
        <div className="ml-auto" />
      )}
    </header>
  );
}

export default Header;
