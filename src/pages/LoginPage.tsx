import Header from "../components/Header";
import AuthDiv from "../components/AuthDiv";
import { useNavigate } from "react-router-dom";
import Img from "../components/LinkImg";

import AcademicoImg from "../assets/Academico.jpg"
import MoodleImg from "../assets/Moodle.jpg"
import SuapImg from "../assets/Suap.jpg"

function RootPage() {
  const navigate = useNavigate();

  return (
    <div id="all" className="flex flex-col min-h-screen">
      <Header />

      {/* conteúdo empilha em telas pequenas, lado a lado em lg pra cima */}
      <div id="conteudo" className="flex flex-col-reverse lg:flex-row flex-1 w-full">
        {/* servicoes full width no mobile/tablet, metade no desktop */}
        <div
          id="servicosContainer"
          className="flex flex-col items-center gap-6 bg-gradient-to-b from-stone-300 to-stone-400 p-6 w-full lg:w-1/2"
        >
          <h1 className="text-2xl md:text-4xl font-bold mt-2">Outros Serviços</h1>
          <Img src={AcademicoImg} alt="Imagem Academico" link="https://academico.iff.edu.br/" size="big" />
          <Img src={MoodleImg} alt="Imagem Moodle" link="https://ead2.iff.edu.br/login/index.php"size="big" />
          <Img src={SuapImg} alt="Imagem Suap" link="https://suap.iff.edu.br/accounts/login/?next=/" size="big" />
        </div>

        {/* login tbm full width no mobile/tablet, metade no desktop */}
        <div
          id="loginContainer"
          className="bg-gradient-to-b from-green-900 to-green-950 flex items-center justify-center flex-col p-8 w-full lg:w-1/2"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white">Cardápio IFF</h1>
          <h2 className="text-lg md:text-2xl font-medium mb-6 text-white">Faça o seu login</h2>

          <div className="w-full max-w-md">
            <AuthDiv mode="login" />
          </div>

          <h2 className="mt-4 text-white text-lg">Novo por aqui?</h2>
          <button
            onClick={() => navigate("/registro")}
            className="mt-2 text-white font-medium hover:underline hover:cursor-pointer"
          >
            Registre-se
          </button>
        </div>
      </div>
    </div>
  );
}

export default RootPage;
