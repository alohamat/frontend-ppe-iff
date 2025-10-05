import api from "./ApiService";

// Tipo para registro de usuário
export type RegistroUsuario = {
  matricula?: string; // só alunos
  email?: string;     // só servidores
  nome: string;
  sobrenome: string;
  senha: string;
  podeAlmocar?: string; // só alunos
};

// Tipo para login
export type LoginUsuario = {
  matricula?: string; // alunos
  email?: string;     // servidores
  senha: string;
};

// Tipo de resposta
export type LoginResponse = {
  token: string;
  user?: any;
};

async function register(data: RegistroUsuario) {
  let resp;
  if (data.matricula) {
    // aluno
    resp = await api.post("alunos/register", data);
  } else if (data.email) {
    // servidor
    resp = await api.post("servidores/register", data);
  } else {
    throw new Error("Payload inválido para registro");
  }
  return resp.data;
}

async function login(creds: LoginUsuario): Promise<LoginResponse> {
  let resp;
  if (creds.matricula) {
    resp = await api.post("alunos/login", creds);
  } else if (creds.email) {
    resp = await api.post("servidores/login", creds);
  } else {
    throw new Error("Credenciais inválidas para login");
  }
  return resp.data;
}

export default {
  register,
  login,
};
