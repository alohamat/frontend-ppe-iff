import Header from "../components/Header";
import Footer from "../components/Footer";

function FormsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 m-10">
                <div className="max-w-3xl text-center space-y-6 mb-10">
                    <h1 className="text-5xl font-bold">Formulários</h1>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 m-5">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeIBKSqnAFTmhvuguey3RjWV8YysbtBqkSMZLQCJjKjo6vnMA/viewform" className="text-4xl underline m-5">Formulário para Ocorrência de Erros</a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeV_T_d6LfXVUmcVD9BpcyK_xLMsWNtA9pNkj51TlHZuIivfA/viewform" className="text-4xl underline m-5">Formulário de Satisfação</a>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default FormsPage