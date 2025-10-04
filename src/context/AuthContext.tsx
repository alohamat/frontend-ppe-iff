import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
  // displayname pode entrar tambem se necessario
  displayName?: string;
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

  // quando token muda, atualiza header default do axios
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("AuthProvider: Authorization header set");
    } else {
      delete api.defaults.headers.common["Authorization"];
      console.log("AuthProvider: Authorization header removed");
    }
  }, [token]);

  // interceptor global para 401 limpa auth
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401) {
          console.warn("Interceptor: 401 recebido -> deslogando");
          clearAuth();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const persistAuth = (t: string | null, u: User | null) => {
    setToken(t);
    setUser(u);
    if (t) {
      localStorage.setItem("token", t);
    } else {
      localStorage.removeItem("token");
    }
    if (u) {
      // displayname pra usar em navbar e etc
      const displayName = `${u.nome ?? ""}${u.sobrenome ? " " + u.sobrenome : ""}`.trim();
      const toSave = { ...u, displayName };
      setUser(toSave);
      localStorage.setItem("user", JSON.stringify(toSave));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
    console.log("persistAuth -> token salvo (len):", t ? t.length : 0);
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    try { navigate("/login"); } catch (e) { /* ignore */ }
  };

  const fetchUser = async (explicitToken?: string): Promise<User | null> => {
    try {
      if (explicitToken) {
        console.log("fetchUser usando token explícito, setando header temporário");
      } else {
        console.log("fetchUser usando header default");
      }

      const resp = await api.get("/alunos/detalhes", {
        headers: explicitToken ? { Authorization: `Bearer ${explicitToken}` } : undefined,
      });
      console.log("fetchUser OK:", resp.data);
      return resp.data as User;
    } catch (err: any) {
      console.error("fetchUser erro:", err?.response?.status, err?.message);
      if (err?.response?.status === 403) {
        console.warn("fetchUser -> 403: token válido mas sem permissão (verifique roles/ativação no backend).");
      }
      return null;
    }
  };

  const login = async (creds: LoginUsuario) => {
    const data = await AuthService.login(creds);
    if (!data?.token) throw new Error("Resposta do servidor sem token");
    // persiste token e busca user
    persistAuth(data.token, null);
    // tenta fetch com token explícito (garante header)
    const u = await fetchUser(data.token);
    if (u) persistAuth(data.token, u);
    navigate("/main");
  };

  const register = async (dados: RegistroUsuario) => {
    const data = await AuthService.register(dados);
    if (!data?.token) {
      navigate("/login?registered=1");
      return;
    }
    // garante persistencia consistente
    persistAuth(data.token, null);
    console.log("register -> token salvo, tentando fetchUser (com token explícito)");
    const u = await fetchUser(data.token);

    if (u) {
      persistAuth(data.token, u);
      navigate("/main");
    } else {
      console.warn("register -> fetchUser retornou null (possível 403).");
      // opcional: você pode limpar auth para forçar login
      // clearAuth();
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
  if (!ctx) throw new Error("useauth tem que ser usado dentro de authcontext");
  return ctx;
}
