import InputForm from "./InputForm";

type AuthDivProps = {
  mode: string;
};

function AuthDiv({ mode }: AuthDivProps) {
  return (
    <div>
      <form className="flex flex-col items-center gap-5">
        <InputForm placeholder="Matrícula" />
        <InputForm placeholder="Senha" />
        {mode == "registro" ? (
          <InputForm placeholder="Confirmar senha" />
        ) : null}
        {mode == "registro" ? <InputForm placeholder="Nome" /> : null}
        {mode == "registro" ? <InputForm placeholder="Sobrenome" /> : null}
        <button
          type="submit"
          className="w-[25vw] bg-green-500 p-2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
        >
          {mode == "registro" ? "Registrar" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthDiv;
