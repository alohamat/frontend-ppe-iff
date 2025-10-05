
type Refeicao = {
  comida?: string;
  bebida?: string;
};

// backend
export type CardapioData = {
  dia: string;
  almoco?: Refeicao[];
  cafe?: Refeicao[];
  lanche?: Refeicao[];
};

// frontend
type Props = {
  cardapio: CardapioData | null;
  loading: boolean;
};

export default function Cardapio({ cardapio, loading }: Props) {
  if (!cardapio) return <p>Nenhum cardápio disponível</p>;

  return (
    <>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" }}>Cardápio do dia {new Date().toLocaleDateString()}</h2>

          <div>
            {["almoco", "cafe", "lanche"].map((tipo) => {
              const arr = cardapio[tipo as keyof CardapioData] as Refeicao[] | undefined;
              if (!arr || arr.length === 0) return null;

              return (
                <div key={tipo} style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
                  <h3>{tipo === "almoco" ? "Almoço" : tipo === "cafe" ? "Café" : "Lanche"}</h3>
                  {arr.map((r, idx) => (
                    <div key={idx} style={{ marginLeft: 10 }}>
                      <p>🍛 Comida: {r.comida ?? "—"}</p>
                      <p>🧃 Bebida: {r.bebida ?? "—"}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
