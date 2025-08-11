import InputForm from "./InputForm";
import { useState } from "react";
import AuthService from "../services/AuthService";

type AuthDivProps = {
  mode: string;
};

function AuthDiv({ mode }: AuthDivProps) {
  function senhaIncorreta() {
    alert("senha incorreta");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "registro") {
      if (senha !== confirmar) {
        senhaIncorreta();
        return;
      }
      AuthService.RegisterService({
        matricula,
        senha,
        email,
        nome,
        sobrenome,
        podeAlmocar,
      });
    } else {
      AuthService.LoginService({ matricula, senha });
    }
  }
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [podeAlmocar, setPodeAlmocar] = useState(false);

  return (
    <div>
      <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
        <InputForm
          placeholder="Matrícula"
          onChange={(e) => setMatricula(e.target.value)}
        />
        <InputForm
          placeholder="Senha"
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
        {mode == "registro" ? (
          <InputForm
            placeholder="Confirmar senha"
            type="password"
            onChange={(e) => setConfirmar(e.target.value)}
          />
        ) : null}
        {mode == "registro" ? (
          <InputForm
          placeholder="E-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        ) : null}
        {mode == "registro" ? (
          <InputForm
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
        ) : null}
        {mode == "registro" ? (
          <InputForm
            placeholder="Sobrenome"
            onChange={(e) => setSobrenome(e.target.value)}
          />
        ) : null}
        {mode == "registro" ? (
          <div className="flex gap-4">
            <p className="bg-white p-2 rounded-2xl border-2 border-solid">
              Você pode almoçar?
            </p>
            <select
              className="bg-white p-2 rounded-2xl focus:scale-110 transition-all duration-150 ease-in-out border-2 border-solid"
              onChange={(e) =>
                setPodeAlmocar(e.target.value === "sim" ? true : false)
              }
            >
              <option value="n/a"> --- </option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>
        ) : null}
        <button
          type="submit"
          className="w-[25vw] bg-green-500 p-2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer sm:w-[15vw] hover:shadow-[0px_15px_50px_0px]"
        >
          {mode == "registro" ? "Registrar" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthDiv;
