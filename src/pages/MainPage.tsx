import Header from "../components/Header";
import Footer from "../components/Footer";
import type { CardapioData } from "../components/Cardapio";
import Cardapio from "../components/Cardapio";
import { useAuth } from "../context/AuthContext";
import Api from "../services/ApiService";
import { useEffect, useState } from "react";

function MainPage() {
  const { token } = useAuth();
  const [cardapios, setCardapios] = useState<CardapioData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCardapio() {
      setLoading(true);
      try {
        const res = await Api.get("cardapios/hoje", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("recebi cardapio: ", res.data);
        setCardapios(Array.isArray(res.data.cardapio) ? res.data.cardapio : []);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchCardapio();
  }, [token]);

  return (
    <div id="tudo">
      <Header />
      <div id="conteudo" className="flex flex-col min-w-[100vw]">
        <div
          id="topo-conteudo"
          className="flex items-center justify-center m-4"
        >
          <h1 className="text-5xl flex font-bold">Cardápio da Semana:</h1>
        </div>
        <div id="cardapio-div" className="flex-col flex lg:flex-row">
          {cardapios && cardapios.length > 0
            ? cardapios.map((c) => (
              <div className="flex-1">
                <Cardapio key={c.dia} cardapio={c} loading={false} onEdit={() => console.log("edit nao usado aqui")} onDelete={() => console.log("delete nao usado aqui")}/>
              </div>
              ))
            : !loading && <p>Nenhum cardápio disponível</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default MainPage;
