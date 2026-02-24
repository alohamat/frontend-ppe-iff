import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  // Inicializa campos quando initialData mudar
  useEffect(() => {
    if (initialData) {
      console.log("DADOS COMPLETOS RECEBIDOS:", initialData);
      console.log("TODAS AS REFEIÇÕES:", initialData.refeicoes);
      
      // Preenche data
      setDateInput(initialData.data || "");

      // Café
      const cafe = initialData.refeicoes.find(r => r.tipo_refeicao === "cafe");
      console.log("CAFÉ:", cafe);
      setCafeComida(cafe?.comida || "");
      setCafeBebida(cafe?.bebida || "");

      // Almoço - CORRIGIDO: Buscar pelo subtipo correto
      const todosAlmoco = initialData.refeicoes.filter(r => r.tipo_refeicao === "almoco");
      console.log("TODOS OS ITENS DO ALMOÇO:", todosAlmoco);
      
      // Mapear pelo subtipo
      todosAlmoco.forEach(item => {
        switch(item.subtipo) {
          case "entrada":
            setEntrada(item.comida || "");
            break;
          case "acompanhamentos":
            setAcompanhamentos(item.comida || "");
            break;
          case "prato principal":
            setPratoPrincipal(item.comida || "");
            break;
          case "guarnicao":
            setGuarnicao(item.comida || "");
            break;
          case "suco":
            setSuco(item.comida || "");
            break;
          case "sobremesa":
            setFruta(item.comida || "");
            break;
          default:
            // Caso algum item não tenha subtipo definido
            console.warn("Subtipo não reconhecido:", item.subtipo);
        }
      });

      // Lanche
      const lanche = initialData.refeicoes.find(r => r.tipo_refeicao === "lanche");
      setLancheComida(lanche?.comida || "");
      setLancheBebida(lanche?.bebida || "");

      // Janta
      const janta = initialData.refeicoes.find(r => r.tipo_refeicao === "jantar");
      setJantaComida(janta?.comida || "");
      setJantaBebida(janta?.bebida || "");

    } else {
      // Modo create -> limpa tudo
      resetFields();
    }
  }, [initialData]);

  // Reset separado para quando fechar o modal
  useEffect(() => {
    if (!isOpen) {
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
      toast.error("Escolha a data do cardápio.", { position: "top-right" });
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

    // Almoço - CORRIGIDO: usar subtipos consistentes
    if (entrada.trim()) {
      refeicoes.push({
        tipo_refeicao: "almoco",
        subtipo: "entrada",
        comida: entrada.trim(),
        bebida: "—",
      });
    }
    
    if (acompanhamentos.trim()) {
      refeicoes.push({
        tipo_refeicao: "almoco",
        subtipo: "acompanhamentos",
        comida: acompanhamentos.trim(),
        bebida: "—",
      });
    }
    
    if (pratoPrincipal.trim()) {
      refeicoes.push({
        tipo_refeicao: "almoco",
        subtipo: "prato principal",
        comida: pratoPrincipal.trim(),
        bebida: "—",
      });
    }
    
    if (guarnicao.trim()) {
      refeicoes.push({
        tipo_refeicao: "almoco",
        subtipo: "guarnicao",
        comida: guarnicao.trim(),
        bebida: "—",
      });
    }
    
    if (suco.trim()) {
      refeicoes.push({
        tipo_refeicao: "almoco",
        subtipo: "suco",
        comida: suco.trim(),
        bebida: suco.trim(), // Para suco, bebida = comida
      });
    }
    
    if (fruta.trim()) {
      refeicoes.push({
        tipo_refeicao: "almoco",
        subtipo: "sobremesa",
        comida: fruta.trim(),
        bebida: "—",
      });
    }

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
      toast.error("Adicione pelo menos uma refeição.", {position: "top-right"});
      return null;
    }

    return { data: dateInput, refeicoes };
  };

  const handleSubmit = () => {
    const payload = buildPayload();
    if (!payload) return;

    console.log("Enviando payload:", payload);
    console.log("Modo:", mode);
    console.log("ID:", initialData?._id);

    // Passa o ID se estiver no modo edição
    const id = mode === "edit" ? initialData?._id : undefined;
    
    onSubmit(payload, id);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
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
          <input
            type="text"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Entrada"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={acompanhamentos}
            onChange={(e) => setAcompanhamentos(e.target.value)}
            placeholder="Acompanhamentos"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={pratoPrincipal}
            onChange={(e) => setPratoPrincipal(e.target.value)}
            placeholder="Prato Principal"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={guarnicao}
            onChange={(e) => setGuarnicao(e.target.value)}
            placeholder="Guarnição"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={suco}
            onChange={(e) => setSuco(e.target.value)}
            placeholder="Suco"
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="text"
            value={fruta}
            onChange={(e) => setFruta(e.target.value)}
            placeholder="Sobremesa/Fruta"
            className="border rounded px-2 py-1 w-full mb-2"
          />
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
            onClick={onClose}
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