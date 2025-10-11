import { useState } from "react";

type Refeicao = {
  tipo_refeicao: "cafe" | "almoco" | "lanche" | "jantar";
  subtipo?: string; // só para almoço
  comida: string;
  bebida: string;
};

type Payload = {
  data: string; // YYYY-MM-DD
  refeicoes: Refeicao[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: Payload) => void;
};

export default function CardapioModal({ isOpen, onClose, onSubmit }: Props) {
  const [dateInput, setDateInput] = useState("");

  // Café
  const [cafeComida, setCafeComida] = useState("");
  const [cafeBebida, setCafeBebida] = useState("");

  // Almoço
  const [entrada, setEntrada] = useState("");
  const [acompanhamentos, setAcompanhamentos] = useState("");
  const [pratoPrincipal, setPratoPrincipal] = useState("");
  const [guarnicao, setGuarnicao] = useState("");
  const [suco, setSuco] = useState("");
  const [fruta, setFruta] = useState("");

  // Lanche
  const [lancheComida, setLancheComida] = useState("");
  const [lancheBebida, setLancheBebida] = useState("");

  // Janta
  const [jantaComida, setJantaComida] = useState("");
  const [jantaBebida, setJantaBebida] = useState("");

  const handleCriar = () => {
    if (!dateInput) return alert("Escolha a data do cardápio.");

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
      { subtipo: "fruta", value: fruta },
    ];

    almocoParts.forEach(part => {
      if (part.value.trim()) {
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

    if (refeicoes.length === 0) return alert("Adicione pelo menos uma refeição.");

    onSubmit({ data: dateInput, refeicoes });
    onClose();

    setDateInput("");
    setCafeComida(""); setCafeBebida("");
    setEntrada(""); setAcompanhamentos(""); setPratoPrincipal(""); setGuarnicao(""); setSuco(""); setFruta("");
    setLancheComida(""); setLancheBebida("");
    setJantaComida(""); setJantaBebida("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Criar Cardápio</h2>

        <label>Data</label>
        <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} className="border rounded px-2 py-1 w-full mb-4" />

        {/* Café */}
        <div className="mb-4">
          <h3 className="font-semibold">Café</h3>
          <input type="text" value={cafeComida} onChange={e => setCafeComida(e.target.value)} placeholder="Comida do café" className="border rounded px-2 py-1 w-full mb-2" />
          <input type="text" value={cafeBebida} onChange={e => setCafeBebida(e.target.value)} placeholder="Bebida do café" className="border rounded px-2 py-1 w-full" />
        </div>

        {/* Almoço */}
        <div className="mb-4">
          <h3 className="font-semibold">Almoço</h3>
          {["Entrada","Acompanhamentos","Prato Principal","Guarnição","Suco","Fruta"].map((label, i) => {
            const setters = [setEntrada,setAcompanhamentos,setPratoPrincipal,setGuarnicao,setSuco,setFruta];
            const values = [entrada,acompanhamentos,pratoPrincipal,guarnicao,suco,fruta];
            return (
              <input
                key={i}
                type="text"
                value={values[i]}
                onChange={e => setters[i](e.target.value)}
                placeholder={label}
                className="border rounded px-2 py-1 w-full mb-2"
              />
            )
          })}
        </div>

        {/* Lanche */}
        <div className="mb-4">
          <h3 className="font-semibold">Lanche</h3>
          <input type="text" value={lancheComida} onChange={e => setLancheComida(e.target.value)} placeholder="Comida do lanche" className="border rounded px-2 py-1 w-full mb-2" />
          <input type="text" value={lancheBebida} onChange={e => setLancheBebida(e.target.value)} placeholder="Bebida do lanche" className="border rounded px-2 py-1 w-full" />
        </div>

        {/* Janta */}
        <div className="mb-4">
          <h3 className="font-semibold">Janta</h3>
          <input type="text" value={jantaComida} onChange={e => setJantaComida(e.target.value)} placeholder="Comida da janta" className="border rounded px-2 py-1 w-full mb-2" />
          <input type="text" value={jantaBebida} onChange={e => setJantaBebida(e.target.value)} placeholder="Bebida da janta" className="border rounded px-2 py-1 w-full" />
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800" onClick={handleCriar}>Criar</button>
        </div>
      </div>
    </div>
  );
}
