import AuthDiv from "../components/AuthDiv";
import Header from "../components/Header";

function RegistroPage() {
    return (
        <div id="tudo">
            <Header />
            <div id="conteudo" className="bg-stone-300 h-[93.8vh] flex justify-start items-center flex-col">
                <h1 className="m-15 font-bold text-4xl">Registro</h1>
                <AuthDiv mode="registro" />
            </div>
        </div>
    )
}

export default RegistroPage;