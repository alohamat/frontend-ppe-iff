// AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { LoginUsuario, RegistroUsuario } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import api from "../services/ApiService";
import AuthService from "../services/AuthService";

type User = {
  matricula?: string;
  email?: string;
  nome?: string;
  sobrenome?: string;
  roles?: string[];
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (creds: LoginUsuario) => Promise<void>;
  register: (data: RegistroUsuario) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // interceptor para logout em 401
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response && error.response.status === 401) {
          // token expirou ou inválido
          clearAuth();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const persistAuth = (t: string, u: User | null) => {
    setToken(t);
    setUser(u);
    localStorage.setItem("token", t);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    try { navigate("/login"); } catch (e) { /* nada */ }
  };

  const login = async (creds: LoginUsuario) => {
    // authservicelogin retornar token, user
    const data = await AuthService.login(creds);
    if (!data || !data.token) throw new Error("Resposta do servidor sem token");
    persistAuth(data.token, data.user ?? null);
    // redireciona pra home
    navigate("/main");
  };

  const register = async (dados: RegistroUsuario) => {
    console.log("register chamado, nome?: ", dados.nome);
    const data = await AuthService.register(dados);
    if (data.token) {
      persistAuth(data.token, data.user ?? null);
      navigate("/main");
    } else {
      // registra e redireciona pro login
      navigate("/login?registered=1");
    }
  };

  const logout = () => {
    clearAuth();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      isAuthenticated: !!token,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
