import Header from "../components/Header";
import Footer from "../components/Footer";

function MainPage(){

    return(
        <div id="tudo">
            <Header />
            <div id="conteudo" className="flex flex-col-reverse sm:flex-col min-w-[100vw]" >
                <div id="cardapio" className="flex items-center justify-center">
                    <h1 className="text-5xl flex font-bold mt-10">Cardápio da Semana:</h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default MainPage;