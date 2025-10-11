import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardapioModal from "../components/CardapioModal";
import Api from "../services/ApiService";
import type { CardapioData } from "../components/Cardapio";
import Cardapio from "../components/Cardapio";

export default function RestaurantePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardapios, setCardapios] = useState<CardapioData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateCardapio = async (payload: any) => {
    // payload no formato: { data: "YYYY-MM-DD", refeicoes: [ { tipo_refeicao: "almoco", ...}, { tipo_refeicao: "cafe", ... } ] }
    const token = localStorage.getItem("token");
    try {
      const res = await Api.post("cardapios", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("✅ Cardápio criado:", res.data);
      alert("Cardápio criado com sucesso!");
      // atualiza lista ou state aqu
    } catch (err: any) {
      console.error(
        "Erro ao criar cardápio:",
        err.response?.status,
        err.response?.data || err.message
      );
      const msg = err.response?.data?.message || "Erro desconhecido";
      alert("Erro ao criar cardápio: " + msg);
      // não fecha o modal aqui porque o modal já fecha no submit
      // setModalOpen(true);
    }
  };
  const verCardapio = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await Api.get("cardapios/hoje", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCardapios(res.data.cardapio); // back retorna array de cardapios
      console.log("✅ Cardápios recebidos", res.data);
    } catch (err: any) {
      console.error("Erro ao puxar cardápio", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cardápios</h1>

        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mb-6"
          onClick={() => setModalOpen(true)}
        >
          Criar Cardápio
        </button>
        <div className="p-6">
          <button
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mb-6"
            onClick={verCardapio}
          >
            Ver Cardápios
          </button>

          {loading && <p>Carregando cardápios...</p>}

          {cardapios && cardapios.length > 0
            ? cardapios.map((c) => (
                <Cardapio key={c.dia} cardapio={c} loading={false} />
              ))
            : !loading && <p>Nenhum cardápio disponível</p>}
        </div>

        <CardapioModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateCardapio}
        />
      </main>
      <Footer />
    </div>
  );
}
