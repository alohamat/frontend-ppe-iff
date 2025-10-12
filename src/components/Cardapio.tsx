import {
  BreakfastIcon,
  RestaurantIcon,
  SnackIcon,
} from "../assets/icons/Icons";
import { useState } from "react";
import Api from "../services/ApiService";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

type Refeicao = {
  comida?: string;
  bebida?: string;
  subtipo?: string;
  _id: string;
};

export type CardapioData = {
  dia: string;
  almoco?: Refeicao[];
  cafe?: Refeicao[];
  lanche?: Refeicao[];
  jantar?: Refeicao[];
  _id: string;
};

type Props = {
  cardapio: CardapioData | null;
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void; // Mudei de onUpdate para onEdit para ficar mais claro
};

export default function Cardapio({
  cardapio,
  loading,
  onDelete,
  onEdit,
}: Props) {
  const location = useLocation();
  const { token, user } = useAuth();
  const isCantina =
    user?.roles?.includes("ROLE_SER") || user?.roles?.includes("ROLE_CANTINA");

  if (!cardapio) return <p>Nenhum cardápio disponível</p>;
  const [apagando, setApagando] = useState(false);

  // soma mais um a data por causa da diferenca
  const formatarData = (data: string) => {
    const dataAjustada = new Date(data);
    dataAjustada.setDate(dataAjustada.getDate() + 1);
    return dataAjustada.toLocaleDateString();
  };

  const handleDelete = async () => {
    if (!cardapio?._id) return;

    const confirmacao = confirm("Tem certeza que deseja apagar este cardápio?");
    if (!confirmacao) return;

    try {
      setApagando(true);
      const resp = await Api.delete(`cardapios/${cardapio._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!resp) throw new Error("Erro ao apagar o cardápio");

      alert("Cardápio apagado com sucesso!");
      onDelete?.(cardapio._id);
    } catch (err) {
      console.error(err);
      alert("Falha ao apagar o cardápio.");
    } finally {
      setApagando(false);
    }
  };

  const renderRefeicoes = (
    tipo: keyof CardapioData,
    titulo: string,
    Icon: any
  ) => {
    const arr = cardapio[tipo];
    if (!Array.isArray(arr) || arr.length === 0) return null;

    let arrRender = arr;

    if (tipo === "almoco") {
      const subtipoOrder = [
        "entrada",
        "acompanhamentos",
        "prato principal",
        "guarnicao",
        "suco",
        "fruta",
      ];

      arrRender = arr.map((r, i) => ({
        ...r,
        subtipo: r.subtipo || subtipoOrder[i] || `item${i}`,
      }));
    }

    return (
      <div className="mb-5 p-3 border border-gray-300 rounded-lg">
        <h3 className="flex items-center gap-2">
          <Icon /> {titulo}
        </h3>
        {arrRender.map((r, idx) => (
          <div key={idx} style={{ marginLeft: 10 }}>
            {r.subtipo && (
              <strong>
                {r.subtipo.charAt(0).toUpperCase() + r.subtipo.slice(1)}:{" "}
              </strong>
            )}
            <span>
              {tipo === "almoco"
                ? r.comida ?? "—"
                : `Comida: ${r.comida ?? "—"} | Bebida: ${r.bebida ?? "—"}`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <div className="w-full">
          <div className="relative border border-gray-400 rounded-md p-3 shadow-sm text-sm max-w-md mx-auto">
            {isCantina && location.pathname == "/restaurante" && (
              <div>
                <button
                  onClick={handleDelete}
                  disabled={apagando}
                  className="absolute top-1 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow cursor-pointer"
                >
                  {apagando ? "..." : "X"}
                </button>
                <button
                  className="absolute bottom-1 right-2 bg-amber-500 hover:bg-amber-600 px-2 py-0.5 text-xs rounded-full font-bold shadow cursor-pointer"
                  onClick={() => onEdit(cardapio._id)}
                >
                  Editar
                </button>
              </div>
            )}
            <h2 className="text-center mb-3 font-semibold">
              Cardápio do dia {formatarData(cardapio.dia)}
            </h2>

            {renderRefeicoes("cafe", "Café", BreakfastIcon)}
            {renderRefeicoes("almoco", "Almoço", RestaurantIcon)}
            {renderRefeicoes("lanche", "Lanche", SnackIcon)}
            {renderRefeicoes("jantar", "Janta", RestaurantIcon)}
          </div>
        </div>
      )}
    </>
  );
}
