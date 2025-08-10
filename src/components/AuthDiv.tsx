import InputForm from "./InputForm";

type AuthDivProps = {
  mode: string;
};

function AuthDiv({ mode }: AuthDivProps) {
  return (
    <div>
      <form className="flex flex-col items-center gap-5">
        <InputForm placeholder="Matrícula" />
        <InputForm placeholder="Senha" type="password" />
        {mode == "registro" ? (
          <InputForm placeholder="Confirmar senha" type="password" />
        ) : null}
        {mode == "registro" ? <InputForm placeholder="Nome" /> : null}
        {mode == "registro" ? <InputForm placeholder="Sobrenome" /> : null}
        {mode == "registro" ? (
          <div className="flex gap-4">
            <p className="bg-white p-2 rounded-2xl">Você pode almoçar?</p>
            <select className="bg-white p-2 rounded-2xl focus:scale-110 transition-all duration-150 ease-in-out">
              <option value="n/a"> --- </option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>
        ) : null}
        <button
          type="submit"
          className="w-[25vw] bg-green-500 p-2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer sm:w-[15vw] shadow-[0px_15px_50px_0px] hover:shadow-[0px_15px_50px_5px]"
        >
          {mode == "registro" ? "Registrar" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthDiv;
