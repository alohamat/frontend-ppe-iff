import api from "./ApiService";

export type RegistroUsuario = {
  matricula: string;
  senha: string;
  email: string;
  nome: string;
  sobrenome: string;
  podeAlmocar: boolean;
};

export type LoginUsuario = {
  matricula: string;
  senha: string;
};

type LoginResponse = {
  token: string;
  user?: any;
};

async function register(data: RegistroUsuario) {
  const resp = await api.post("/aluno/register", data);
  return resp.data;
}

async function login(creds: LoginUsuario): Promise<LoginResponse> {
  const resp = await api.post("/aluno/login", creds);
  return resp.data;
}

export default {
  register,
  login,
};
