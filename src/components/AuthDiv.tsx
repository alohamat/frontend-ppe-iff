import React, { useState } from "react";
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
  // podeAlmocar como string "sim" | "nao" | "" para fácil envio
  const [podeAlmocar, setPodeAlmocar] = useState<"sim" | "nao" | "">("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function senhaIncorreta() {
    alert("Senha e confirmação não conferem.");
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
      if (userType === "aluno" && !matricula) {
        setErro("Matrícula é obrigatória para alunos.");
        return;
      }
      if (userType === "servidor" && !email) {
        setErro("E-mail é obrigatório para servidores.");
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
        // montar payload dependendo do tipo
        if (userType === "aluno") {
          // registra aluno: matricula, nome, sobrenome, podeAlmocar, senha
          const payload = {
            matricula: matricula.trim(),
            nome: nome.trim(),
            sobrenome: sobrenome.trim(),
            podeAlmocar: podeAlmocar,
            senha,
          };
          const data = await register(payload);
          console.log("Registro aluno:", data);
          alert("Registro de aluno feito. Verifique se token foi retornado.");
        } else {
          // registra servidor: email, nome, sobrenome, senha
          const payload = {
            email: email.trim(),
            nome: nome.trim(),
            sobrenome: sobrenome.trim(),
            senha,
          };
          const data = await register(payload);
          console.log("Registro servidor:", data);
          alert("Registro de servidor feito. Verifique se token foi retornado.");
        }
      } else {
        // login
        if (userType === "aluno") {
          const data = await login({ matricula: matricula.trim(), senha });
          console.log("Login aluno:", data);
        } else {
          const data = await login({ email: email.trim(), senha });
          console.log("Login servidor:", data);
        }
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Erro desconhecido";
      setErro(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
        {/* Escolha do tipo (apenas para registro e login UX) */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="userType"
              checked={userType === "aluno"}
              onChange={() => setUserType("aluno")}
            />
            Aluno
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="userType"
              checked={userType === "servidor"}
              onChange={() => setUserType("servidor")}
            />
            Servidor
          </label>
        </div>

        {/* Campos variam conforme modo / tipo */}
        {mode === "login" ? (
          userType === "aluno" ? (
            <InputForm placeholder="Matrícula" onChange={(e) => setMatricula(e.target.value)} />
          ) : (
            <InputForm placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} />
          )
        ) : (
          // registro: exibir ambos sets adaptativos
          <>
            {userType === "aluno" ? (
              <InputForm placeholder="Matrícula" onChange={(e) => setMatricula(e.target.value)} />
            ) : (
              <InputForm placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} />
            )}

            <InputForm placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
            <InputForm placeholder="Sobrenome" onChange={(e) => setSobrenome(e.target.value)} />

            {/* Apenas aluno tem podeAlmocar */}
            {userType === "aluno" && (
              <div className="flex gap-4 items-center">
                <p className="bg-white p-2 rounded-2xl border-2 border-solid">Você pode almoçar?</p>
                <select
                  className="bg-white p-2 rounded-2xl focus:scale-110 transition-all duration-150 ease-in-out border-2 border-solid"
                  value={podeAlmocar || "n/a"}
                  onChange={(e) =>
                    setPodeAlmocar(e.target.value === "sim" ? "sim" : e.target.value === "nao" ? "nao" : "")
                  }
                >
                  <option value="n/a"> --- </option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
            )}
          </>
        )}

        {/* Senha / confirmar */}
        <InputForm placeholder="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
        {mode === "registro" && <InputForm placeholder="Confirmar senha" type="password" onChange={(e) => setConfirmar(e.target.value)} />}

        {/* Erro visível */}
        {erro && <p className="text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-[25vw] bg-green-500 p-2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer sm:w-[15vw] hover:shadow-[0px_15px_50px_0px] border-2 border-solid disabled:opacity-50"
        >
          {loading ? "Processando..." : mode === "registro" ? "Registrar" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthDiv;
