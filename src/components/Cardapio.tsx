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
    <div className="mb-5 p-3 border border-gray-300 rounded-lg">
      <h3 className="flex items-center gap-2">
      <Icon /> {titulo}
      </h3>
      {arrRender.map((r, idx) => (
        <div key={idx} style={{ marginLeft: 10 }}> {/* por algum motivo o tailwind buga aqui, entao usei css tradicional*/}
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
      <div className="w-full">
        <div className="border border-gray-400 rounded-lg p-6 shadow-md">
          <h2 className="text-center mb-6">
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
)
}
