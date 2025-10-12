import { useEffect, useState } from "react";

// Tipos
export type Refeicao = {
  tipo_refeicao: "cafe" | "almoco" | "lanche" | "jantar";
  subtipo?: string;
  comida: string;
  bebida: string;
};

export type Payload = {
  data: string;
  refeicoes: Refeicao[];
};

type InitialData = Payload & { _id?: string };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: Payload, id?: string) => void;
  mode?: "create" | "edit";
  initialData?: InitialData | null;
};

export default function CardapioModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  initialData = null,
}: Props) {
  // Estados dos campos
  const [dateInput, setDateInput] = useState("");
  const [cafeComida, setCafeComida] = useState("");
  const [cafeBebida, setCafeBebida] = useState("");
  const [entrada, setEntrada] = useState("");
  const [acompanhamentos, setAcompanhamentos] = useState("");
  const [pratoPrincipal, setPratoPrincipal] = useState("");
  const [guarnicao, setGuarnicao] = useState("");
  const [suco, setSuco] = useState("");
  const [fruta, setFruta] = useState("");
  const [lancheComida, setLancheComida] = useState("");
  const [lancheBebida, setLancheBebida] = useState("");
  const [jantaComida, setJantaComida] = useState("");
  const [jantaBebida, setJantaBebida] = useState("");

  // Inicializa campos apenas quando initialData mudar
  useEffect(() => {
    if (initialData) {
      // Preenche com dados existentes
      setDateInput(initialData.data || "");

      // Helper para buscar refeicao por tipo
      const find = (tipo: Refeicao["tipo_refeicao"], subtipo?: string) =>
        initialData.refeicoes.find((r) => {
          if (r.tipo_refeicao !== tipo) return false;
          if (subtipo) return (r.subtipo || "").toLowerCase() === subtipo.toLowerCase();
          return true;
        });

      // Café
      const cafe = find("cafe");
      setCafeComida(cafe?.comida || "");
      setCafeBebida(cafe?.bebida || "");

      // Almoço por subtipo
      const entradaR = find("almoco", "entrada");
      const acompanhamentosR = find("almoco", "acompanhamentos");
      const pratoR = find("almoco", "prato principal");
      const guarnicaoR = find("almoco", "guarnicao");
      const sucoR = find("almoco", "suco");
      const frutaR = find("almoco", "sobremesa") || find("almoco", "fruta");

      setEntrada(entradaR?.comida || "");
      setAcompanhamentos(acompanhamentosR?.comida || "");
      setPratoPrincipal(pratoR?.comida || "");
      setGuarnicao(guarnicaoR?.comida || "");
      setSuco(sucoR?.comida || "");
      setFruta(frutaR?.comida || "");

      // Lanche
      const lanche = find("lanche");
      setLancheComida(lanche?.comida || "");
      setLancheBebida(lanche?.bebida || "");

      // Janta
      const janta = find("jantar");
      setJantaComida(janta?.comida || "");
      setJantaBebida(janta?.bebida || "");
    } else {
      // Modo create -> limpa tudo
      resetFields();
    }
  }, [initialData]); // Agora só depende de initialData, não de isOpen

  // Reset separado para quando fechar o modal
  useEffect(() => {
    if (!isOpen) {
      // Só reseta quando o modal fechar completamente
      setTimeout(() => {
        resetFields();
      }, 300);
    }
  }, [isOpen]);

  const resetFields = () => {
    setDateInput("");
    setCafeComida("");
    setCafeBebida("");
    setEntrada("");
    setAcompanhamentos("");
    setPratoPrincipal("");
    setGuarnicao("");
    setSuco("");
    setFruta("");
    setLancheComida("");
    setLancheBebida("");
    setJantaComida("");
    setJantaBebida("");
  };

  const buildPayload = (): Payload | null => {
    if (!dateInput) {
      alert("Escolha a data do cardápio.");
      return null;
    }
    const refeicoes: Refeicao[] = [];

    // Café
    if (cafeComida.trim()) {
      refeicoes.push({
        tipo_refeicao: "cafe",
        comida: cafeComida.trim(),
        bebida: cafeBebida.trim() || "—",
      });
    }

    // Almoço (6 partes)
    const almocoParts = [
      { subtipo: "entrada", value: entrada },
      { subtipo: "acompanhamentos", value: acompanhamentos },
      { subtipo: "prato principal", value: pratoPrincipal },
      { subtipo: "guarnicao", value: guarnicao },
      { subtipo: "suco", value: suco },
      { subtipo: "sobremesa", value: fruta },
    ];

    almocoParts.forEach((part) => {
      if (part.value && part.value.trim()) {
        refeicoes.push({
          tipo_refeicao: "almoco",
          subtipo: part.subtipo,
          comida: part.value.trim(),
          bebida: part.subtipo === "suco" ? part.value.trim() : "—",
        });
      }
    });

    // Lanche
    if (lancheComida.trim()) {
      refeicoes.push({
        tipo_refeicao: "lanche",
        comida: lancheComida.trim(),
        bebida: lancheBebida.trim() || "—",
      });
    }

    // Janta
    if (jantaComida.trim()) {
      refeicoes.push({
        tipo_refeicao: "jantar",
        comida: jantaComida.trim(),
        bebida: jantaBebida.trim() || "—",
      });
    }

    if (refeicoes.length === 0) {
      alert("Adicione pelo menos uma refeição.");
      return null;
    }

    return { data: dateInput, refeicoes };
  };

  const handleSubmit = () => {
    const payload = buildPayload();
    if (!payload) return;

    console.log("📤 Enviando payload:", payload); // Debug
    console.log("🔧 Modo:", mode); // Debug
    console.log("🆔 ID:", initialData?._id); // Debug

    // Passa o ID se estiver no modo edição
    const id = mode === "edit" ? initialData?._id : undefined;
    
    onSubmit(payload, id);

    // Não reseta imediatamente - deixa o modal fechar naturalmente
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{mode === "edit" ? "Editar Cardápio" : "Criar Cardápio"}</h2>

        <label className="block mb-1 font-medium">Data</label>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="border rounded px-2 py-1 w-full mb-4"
        />

        {/* Café */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Café</h3>
          <input
            type="text"
            value={cafeComida}
            onChange={(e) => setCafeComida(e.target.value)}
            placeholder="Comida do café"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={cafeBebida}
            onChange={(e) => setCafeBebida(e.target.value)}
            placeholder="Bebida do café"
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Almoço */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Almoço</h3>
          {["Entrada", "Acompanhamentos", "Prato Principal", "Guarnição", "Suco", "Fruta"].map((label, i) => {
            const setters = [setEntrada, setAcompanhamentos, setPratoPrincipal, setGuarnicao, setSuco, setFruta];
            const values = [entrada, acompanhamentos, pratoPrincipal, guarnicao, suco, fruta];
            return (
              <input
                key={i}
                type="text"
                value={values[i]}
                onChange={(e) => setters[i](e.target.value)}
                placeholder={label}
                className="border rounded px-2 py-1 w-full mb-2"
              />
            );
          })}
        </div>

        {/* Lanche */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Lanche</h3>
          <input
            type="text"
            value={lancheComida}
            onChange={(e) => setLancheComida(e.target.value)}
            placeholder="Comida do lanche"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={lancheBebida}
            onChange={(e) => setLancheBebida(e.target.value)}
            placeholder="Bebida do lanche"
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        {/* Janta */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Janta</h3>
          <input
            type="text"
            value={jantaComida}
            onChange={(e) => setJantaComida(e.target.value)}
            placeholder="Comida da janta"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={jantaBebida}
            onChange={(e) => setJantaBebida(e.target.value)}
            placeholder="Bebida da janta"
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => {
              onClose();
            }}
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800" 
            onClick={handleSubmit}
          >
            {mode === "edit" ? "Salvar" : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
}