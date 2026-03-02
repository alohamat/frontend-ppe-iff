import Header from "../components/Header";
import Footer from "../components/Footer";
import { ClipboardList, AlertTriangle } from "lucide-react";

function FormsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Header />

            <main className="flex-1 flex flex-col items-center px-6 py-16">
                <div className="max-w-4xl w-full text-center space-y-4">
                    <h1 className="text-5xl font-bold">Formulários</h1>
                    <p className="text-lg text-gray-600">
                        Sua opinião ajuda a melhorar o sistema 🚀
                    </p>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                    
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeV_T_d6LfXVUmcVD9BpcyK_xLMsWNtA9pNkj51TlHZuIivfA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <ClipboardList className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-semibold">
                            Formulário de Satisfação
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Conte pra gente como foi sua experiência.
                        </p>
                    </a>

                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeIBKSqnAFTmhvuguey3RjWV8YysbtBqkSMZLQCJjKjo6vnMA/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <AlertTriangle className="w-10 h-10 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-2xl font-semibold">
                            Reportar Erro
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Encontrou algum problema? Nos avise aqui.
                        </p>
                    </a>

                </div>
            </main>

            <Footer />
        </div>
    );
}

export default FormsPage;