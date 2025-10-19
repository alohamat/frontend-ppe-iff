import { useState } from "react";
import InputForm from "./InputForm";
import { useAuth } from "../context/AuthContext";

type AuthDivProps = {
  mode: "registro" | "login";
};

type UserType = "aluno" | "servidor";

function AuthDiv({ mode }: AuthDivProps) {
  const { login, register } = useAuth();

  // Tipo do usuário para direcionar campos/endpoints
  const [userType, setUserType] = useState<UserType>("aluno");

  // Campos comuns
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [podeAlmocar, _setPodeAlmocar] = useState<"sim" | "nao" | "">("nao");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function senhaIncorreta() {
    setErro("Senha e confirmação não conferem.");
  }

  function limparErros() {
    setErro(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    limparErros();

    // validações básicas
    if (!senha) {
      setErro("Senha é obrigatória.");
      return;
    }

    if (mode === "registro" && senha !== confirmar) {
      senhaIncorreta();
      return;
    }

    // Campos por tipo
    if (mode === "registro") {
      // Apenas alunos podem se registrar
      if (!matricula) {
        setErro("Matrícula é obrigatória para alunos.");
        return;
      }
      if (!nome || !sobrenome) {
        setErro("Nome e sobrenome são obrigatórios.");
        return;
      }
    } else {
      // login
      if (userType === "aluno" && !matricula) {
        setErro("Matrícula é obrigatória para login de aluno.");
        return;
      }
      if (userType === "servidor" && !email) {
        setErro("Email é obrigatório para login de servidor.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "registro") {
        const payload = {
          matricula: matricula.trim(),
          nome: nome.trim(),
          sobrenome: sobrenome.trim(),
          podeAlmocar: podeAlmocar,
          senha,
        };
        const data = await register(payload);
        console.log("Registro aluno:", data);
      } else {
        if (userType === "aluno") {
          const data = await login({ matricula: matricula.trim(), senha });
          console.log("Login aluno:", data);
        } else {
          if (!validarEmail(email)) {
            setErro("Email inválido. Use o formato: seuemail@dominio.com");
            return;
          }
          const data = await login({ email: email.trim(), senha });
          console.log("Login servidor:", data);
        }
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err.message || "Erro desconhecido";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
      >
        {mode === "login" && (
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="userType"
                checked={userType === "aluno"}
                onChange={() => setUserType("aluno")}
              />
              Aluno
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="userType"
                checked={userType === "servidor"}
                onChange={() => setUserType("servidor")}
              />
              Servidor
            </label>
          </div>
        )}

        {mode === "login" ? (
          userType === "aluno" ? (
            <InputForm
              key="aluno-input"
              placeholder="Matrícula"
              onChange={(e) => setMatricula(e.target.value)}
              id="matriculainput"
              value={matricula}
            />
          ) : (
            <InputForm
              key="servidor-input"
              placeholder="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="emailinput"
              value={email}
            />
          )
        ) : (
          <div className="flex flex-col gap-4">
            <InputForm
              placeholder="Matrícula"
              onChange={(e) => setMatricula(e.target.value)}
            />
            <InputForm
              placeholder="Nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <InputForm
              placeholder="Sobrenome"
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </div>
        )}

        {/* Senha / confirmar */}
        <InputForm
          placeholder="Senha"
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
        {mode === "registro" && (
          <InputForm
            placeholder="Confirmar senha"
            type="password"
            onChange={(e) => setConfirmar(e.target.value)}
          />
        )}

        {/* Erro visível */}
        {erro && <p className="text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-[25vw] bg-green-500 p-2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer sm:w-[15vw] hover:shadow-[0px_15px_50px_0px] border-2 border-solid disabled:opacity-50"
        >
          {loading
            ? "Processando..."
            : mode === "registro"
            ? "Registrar"
            : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthDiv;
