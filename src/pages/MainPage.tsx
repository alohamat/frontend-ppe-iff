import Header from "../components/Header";
import Footer from "../components/Footer";
import type { CardapioData } from "../components/Cardapio";
import Cardapio from "../components/Cardapio";
import { useAuth } from "../context/AuthContext";
import Api from "../services/ApiService";
import { useEffect, useState } from "react";

function MainPage() {
  const { token } = useAuth();
  const [cardapio, setCardapio] = useState<CardapioData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCardapio() {
      setLoading(true);
      try {
        const res = await Api.get("cardapios/2025-01-10", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("recebi cardapio: ", res.data);
        setCardapio(res.data.cardapio);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchCardapio();
  }, [token]);
  useEffect(() => {
    console.log("cardapio mudou:", cardapio);
  }, [cardapio]);

  return (
    <div id="tudo">
      <Header />
      <div id="conteudo" className="flex flex-col min-w-[100vw]">
        <div id="topo-conteudo" className="flex items-center justify-center m-4">
          <h1 className="text-5xl flex font-bold">Cardápio da Semana:</h1>
        </div>
        <span>
          <Cardapio cardapio={cardapio} loading={loading} />
        </span>
      </div>
      <Footer />
    </div>
  );
}
export default MainPage;
