import Header from "../components/Header";
import AuthDiv from "../components/AuthDiv";
import { useNavigate } from "react-router-dom";

function RootPage() {
  const navigate = useNavigate();

  return (
    <div id="all">
      <Header />
      <div id="conteudo" className="flex flex-col sm:flex-row">
        <div
          id="servicosContainer"
          className="flex flex-col w-[100vw] sm:w-[50vw] items-center gap-15 bg-stone-300 h-[93.8vh]"
        >
          <h1 className="text-5xl font-bold mt-5">Outros Serviços</h1>
          <a href="https://academico.iff.edu.br/">
            <img
              src="src/assets/Academico.jpg"
              alt="Imagem Academico"
              className="h-[15vh] hover:cursor-pointer shadow-[0_15px_90px_0px] hover:shadow-[0_15px_90px_10px] transition ease-in-out duration-300 rounded-xl"
            />
          </a>
          <a href="https://ead2.iff.edu.br/login/index.php">
            <img
              src="src/assets/Moodle.jpg"
              alt="Imagem Moodle"
              className="h-[15vh] hover:cursor-pointer shadow-[0_15px_90px_0px] hover:shadow-[0_15px_90px_10px] transition ease-in-out duration-300 rounded-xl"
            />
          </a>
          <a href="https://suap.iff.edu.br/accounts/login/?next=/">
            <img
              src="src/assets/Suap.jpg"
              alt="Imagem Suap"
              className="h-[15vh] hover:cursor-pointer shadow-[0_15px_90px_0px] hover:shadow-[0_15px_90px_10px] transition ease-in-out duration-300 rounded-xl"
            />
          </a>
        </div>
        <div
          id="loginContainer"
          className="w-[100vw] sm:w-[50vw] h-screen sm:h-[93.8vh] bg-green-900 flex items-center flex-col"
        >
          <h1 className="text-5xl font-bold mt-5 text-white">Cardápio IFF</h1>
          <h2 className="text4xl font-medium mb-10 text-white">
            Faça o seu login
          </h2>
          <AuthDiv mode="login" />
          <h2 className="m-4 text-white text-2xl">Novo por aqui?</h2>
          <a
            href=""
            className="text-blue-600 font-medium hover:underline"
            onClick={() => navigate("/registro")}
          >
            Registre-se
          </a>
        </div>
      </div>
    </div>
  );
}

export default RootPage;
