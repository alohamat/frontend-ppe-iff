import Header from "../components/Header";
import Footer from "../components/Footer";

import Renatito from "../assets/images/renatito.png"
import Orlando from "../assets/images/orlando.png"
import Jota from "../assets/images/jota.png"

function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="max-w-3xl text-center space-y-6 mb-10">
                    <h1 className="text-3xl font-bold">Sobre Nós</h1>

                    <p className="text-lg leading-relaxed">
                        Somos alunos do curso de <strong>Informática</strong> e criamos este site
                        com o objetivo de facilitar o dia a dia de alunos e da cantina escolar,
                        utilizando um <strong>Cardápio Digital</strong> em vez de um impresso.
                    </p>

                    <div className="text-left text-lg leading-relaxed mx-auto max-w-2xl">
                        <p className="text-center mb-3">O cardápio digital tem muitas vantagens, como:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Permite fazer alterações a qualquer hora;</li>
                            <li>Pode ser acessado de qualquer lugar;</li>
                            <li>Reduz o uso de papel e impressão;</li>
                        </ul>
                    </div>
                </div>

                <h1 className="text-4xl text-green-700 font-bold mb-10">Alunos Colaboradores</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src="https://github.com/Cacassiano.png" alt="Cassiano" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <a href="https://github.com/Cacassiano" className="text-2xl font-semibold text-green-700 hover:underline">Cassiano</a>
                            <p className="text-gray-700 mt-1">Principal colaborador do <strong>back-end</strong> do site.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src="https://github.com/alohamat.png" alt="Kayky" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <a href="https://github.com/alohamat" className="text-2xl font-semibold text-green-700 hover:underline">Kayky</a>
                            <p className="text-gray-700 mt-1">Principal colaborador do <strong>front-end</strong> do site.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src="https://github.com/Goken5.png" alt="Davi" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <a href="https://github.com/Goken5" className="text-2xl font-semibold text-green-700 hover:underline">Davi Fernandes</a>
                            <p className="text-gray-700 mt-1">Principal colaborador da estilização do <strong>front-end</strong> do site.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src="https://github.com/Matrukis.png" alt="Matheus" className="w-32 h-32 rounded-lg shadow-md object-cover" />
                        <div>
                            <a href="https://github.com/Matrukis" className="text-2xl font-semibold text-green-700 hover:underline">Matheus Barcelos</a>
                            <p className="text-gray-700 mt-1">Principal colaborador da <strong>conceitualização</strong> e <strong>programação</strong> do site.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src="https://github.com/Witeido17.png" alt="Miguel" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <a href="https://github.com/Witeido17" className="text-2xl font-semibold text-green-700 hover:underline">Miguel Nogueira</a>
                            <p className="text-gray-700 mt-1">Principal colaborador das <strong>artes</strong> e <strong>designer</strong> do site.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src="https://github.com/mjoaoooo.png" alt="João Mateus" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <a href="https://github.com/mjoaoooo" className="text-2xl font-semibold text-green-700 hover:underline">João Mateus</a>
                            <p className="text-gray-700 mt-1">Grande apoio na migração de <strong>HTML e CSS</strong> para <strong>React</strong>.</p>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl text-green-700 font-bold m-10">Servidores Colaboradores</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src={Orlando} alt="orlando" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <h1 className="text-2xl font-semibold text-green-700">Orlando</h1>
                            <p className="text-gray-700 mt-1">Nosso <strong>orientador</strong> no projeto.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src={Renatito} alt="renatito" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <h1 className="text-2xl font-semibold text-green-700">Renatito</h1>
                            <p className="text-gray-700 mt-1"><strong>Professor</strong> da nossa disciplina de PPE (Projeto de Pesquisa e Extensão)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 max-w-sm">
                        <img src={Jota} alt="Jota" className="w-32 h-32 rounded-lg shadow-md object-cover"/>
                        <div>
                            <h1 className="text-2xl font-semibold text-green-700">Jota</h1>
                            <p className="text-gray-700 mt-1"><strong>Beta Tester</strong> e Estagiário da Cantina do IFF.</p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default AboutPage;
