import Header from "../components/Header";
import Footer from "../components/Footer";

function FormsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 m-10">
                <div className="max-w-3xl text-center space-y-6">
                    <h1 className="text-5xl font-bold">Formulários</h1>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                    <ul className="list-disc list-inside space-y-2">
                        <li> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeV_T_d6LfXVUmcVD9BpcyK_xLMsWNtA9pNkj51TlHZuIivfA/viewform" className="font-semibold text-3xl lg:text-4xl hover:underline m-5 hover:scale-105 transform transition-all">Formulário de Satisfação</a></li>
                        <br />
                        <li> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeIBKSqnAFTmhvuguey3RjWV8YysbtBqkSMZLQCJjKjo6vnMA/viewform" className="font-semibold text-3xl lg:text-4xl hover:underline m-5 hover:scale-105 transform transition-all">Formulário para Ocorrência de Erros</a></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default FormsPage