import { BreakfastIcon, RestaurantIcon, SnackIcon } from "../assets/icons/Icons";

type Refeicao = {
  comida?: string;
  bebida?: string;
  subtipo?: string; // só para almoço
};

// backend
export type CardapioData = {
  dia: string;
  almoco?: Refeicao[];
  cafe?: Refeicao[];
  lanche?: Refeicao[];
  jantar?: Refeicao[];
};

// frontend
type Props = {
  cardapio: CardapioData | null;
  loading: boolean;
};

export default function Cardapio({ cardapio, loading }: Props) {
  if (!cardapio) return <p>Nenhum cardápio disponível</p>;

  const formatarData = (data: string) => new Date(data).toLocaleDateString();

 const renderRefeicoes = (tipo: keyof CardapioData, titulo: string, Icon: any) => {
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
      "sobremesa",
    ];

    arrRender = arr.map((r, i) => ({
      ...r,
      subtipo: r.subtipo || subtipoOrder[i] || `item${i}`,
    }));
  }

  return (
    <div style={{ marginBottom: 20, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              ? r.comida ?? "—" // só mostra a comida do almoço
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
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Cardápio do dia {formatarData(cardapio.dia)}
          </h2>

          {renderRefeicoes("cafe", "Café", BreakfastIcon)}
          {renderRefeicoes("almoco", "Almoço", RestaurantIcon)}
          {renderRefeicoes("lanche", "Lanche", SnackIcon)}
          {renderRefeicoes("jantar", "Janta", RestaurantIcon)}
        </div>
      )}
    </>
  );
}
