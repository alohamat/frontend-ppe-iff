import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardapioModal from "../components/CardapioModal";
import Api from "../services/ApiService";
import type { CardapioData } from "../components/Cardapio";
import Cardapio from "../components/Cardapio";

import { toast } from "react-toastify";

export default function RestaurantePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cardapioToEdit, setCardapioToEdit] = useState<CardapioData | null>(null);
  const [cardapios, setCardapios] = useState<CardapioData[] | null>(null);
  const [loading, setLoading] = useState(false);

  // puxa os cardapios ao iniciar a pagina
  useEffect(() => {
    verCardapio();
  }, [])

  // Criar cardápio
  const handleCreateCardapio = async (payload: any) => {
    const token = localStorage.getItem("token");
    try {
      const res = await Api.post("cardapios", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("✅ Cardápio criado:", res.data);
      toast.success("Cardápio criado com sucesso!", {position:"top-right"});
      verCardapio();
      setModalOpen(false);
    } catch (err: any) {
      console.error(
        "Erro ao criar cardápio:",
        err.response?.status,
        err.response?.data || err.message
      );
      const msg = err.response?.data?.message || "Erro desconhecido";
      toast.error("Erro ao criar cardápio: " + msg, {position:"top-right"});
    }
  };

// Função melhorada para lidar com os subtipos do almoço
const convertToBackendFormat = (payload: any, existingCardapio: CardapioData | null) => {
  if (!existingCardapio) {
    console.error("❌ Cardápio existente não encontrado");
    return { data: payload.data, upd: [] };
  }

  const backendPayload: any = {
    data: payload.data,
    upd: []
  };

  // Mapeamento de subtipos para normalizar
  const subtipoMap: { [key: string]: string } = {
    'entrada': 'entrada',
    'acompanhamentos': 'acompanhamentos', 
    'prato principal': 'prato principal',
    'guarnicao': 'guarnicao',
    'suco': 'suco',
    'fruta': 'fruta'
  };

  // Para cada refeição no payload, encontre o _id correspondente
  payload.refeicoes.forEach((refeicao: any) => {
    let existingRefeicao = null;

    // Busca a refeição correspondente
    switch (refeicao.tipo_refeicao) {
      case 'cafe':
        existingRefeicao = existingCardapio.cafe?.[0];
        break;
      case 'almoco':
        // Para almoço, normaliza o subtipo e busca
        const subtipoNormalizado = subtipoMap[refeicao.subtipo?.toLowerCase()] || refeicao.subtipo;
        existingRefeicao = existingCardapio.almoco?.find(a => 
          a.subtipo?.toLowerCase() === subtipoNormalizado?.toLowerCase()
        );
        
        // Se não encontrou, tenta buscar por ordem (fallback)
        if (!existingRefeicao && existingCardapio.almoco) {
          const subtipoOrder = ['entrada', 'acompanhamentos', 'prato principal', 'guarnicao', 'suco', 'fruta'];
          const index = subtipoOrder.indexOf(subtipoNormalizado);
          if (index !== -1) {
            existingRefeicao = existingCardapio.almoco[index];
          }
        }
        break;
      case 'lanche':
        existingRefeicao = existingCardapio.lanche?.[0];
        break;
      case 'jantar':
        existingRefeicao = existingCardapio.jantar?.[0];
        break;
    }

    if (existingRefeicao && existingRefeicao._id) {
      const updateItem: any = {
        _id: existingRefeicao._id,
        tipo_refeicao: refeicao.tipo_refeicao,
        comida: refeicao.comida,
        bebida: refeicao.bebida
      };

      // Para almoço, inclui o subtipo
      if (refeicao.tipo_refeicao === 'almoco' && refeicao.subtipo) {
        updateItem.subtipo = refeicao.subtipo;
      }

      backendPayload.upd.push(updateItem);
      
      console.log(`✅ Refeição ${refeicao.tipo_refeicao}${refeicao.subtipo ? ` (${refeicao.subtipo})` : ''} com _id:`, existingRefeicao._id);
    } else {
      console.warn("⚠️ Refeição não encontrada:", refeicao);
    }
  });

  return backendPayload;
};

const handleEditCardapio = async (payload: any, id?: string) => {
  if (!id) return;
  
  const token = localStorage.getItem("token");
  try {
    // Encontra o cardápio existente para pegar os ds das refeições
    const existingCardapio = cardapios?.find(c => c._id === id) || null;
    
    if (!existingCardapio) {
      toast.error("Cardápio não encontrado para edição", {position: "top-right"});
      return;
    }

    const backendPayload = convertToBackendFormat(payload, existingCardapio);
    
    console.log("🔄 Payload com _ids:", JSON.stringify(backendPayload, null, 2));
    
    const res = await Api.put(`cardapios/${id}`, backendPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log("✅ Resposta do backend:", res.data);
    toast.success("Cardápio editado com sucesso!", {position: "top-right"});
    verCardapio();
    setModalOpen(false);
    setCardapioToEdit(null);
  } catch (err: any) {
    console.error(
      "Erro ao editar cardápio:",
      err.response?.status,
      err.response?.data || err.message
    );
    const msg = err.response?.data?.message || "Erro desconhecido";
    toast.error("Erro ao editar cardápio: " + msg, {position: "top-right"});
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
      setCardapios(res.data.cardapio);
      console.log("✅ Cardápios recebidos", res.data);
    } catch (err: any) {
      console.error("Erro ao puxar cardápio", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setCardapios((prev) => (prev ? prev.filter((c) => c._id !== id) : prev));
  };

  const handleEdit = (id: string) => {
    const cardapio = cardapios?.find((c) => c._id === id);
    if (cardapio) {
      setCardapioToEdit(cardapio);
      setModalOpen(true);
    }
  };

const convertToModalData = (cardapio: CardapioData) => {
  const refeicoes = [];

  // Café
  if (cardapio.cafe && cardapio.cafe.length > 0) {
    refeicoes.push({
      tipo_refeicao: "cafe" as const,
      comida: cardapio.cafe[0].comida || "",
      bebida: cardapio.cafe[0].bebida || "",
    });
  }

  // Almoço
  if (cardapio.almoco && cardapio.almoco.length > 0) {
    cardapio.almoco.forEach(item => {
      refeicoes.push({
        tipo_refeicao: "almoco" as const,
        subtipo: item.subtipo,
        comida: item.comida || "",
        bebida: item.bebida || item.comida || "", // Para suco, a bebida é a mesma que a comida
      });
    });
  }

  // Lanche
  if (cardapio.lanche && cardapio.lanche.length > 0) {
    refeicoes.push({
      tipo_refeicao: "lanche" as const,
      comida: cardapio.lanche[0].comida || "",
      bebida: cardapio.lanche[0].bebida || "",
    });
  }

  // Jantar
  if (cardapio.jantar && cardapio.jantar.length > 0) {
    refeicoes.push({
      tipo_refeicao: "jantar" as const,
      comida: cardapio.jantar[0].comida || "",
      bebida: cardapio.jantar[0].bebida || "",
    });
  }

  return {
    _id: cardapio._id,
    data: cardapio.dia,
    refeicoes
  };
};

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col p-4">
        <div className="flex items-center w-full mt-3 mb-6">
          <h1 className="sm:text-2xl font-bold text-xl">Cardápios</h1>
          <div className="ml-auto flex gap-2">
            <button
              className="bg-green-700 text-white px-2 py-2 rounded hover:bg-green-800 cursor-pointer flex-shrink"
              onClick={() => {
                setModalOpen(true);
                setCardapioToEdit(null);
              }}
            >
              Criar Cardápio
            </button>
            <button
              className="bg-blue-700 text-white px-2 py-2 rounded hover:bg-blue-800 cursor-pointer flex-shrink"
              onClick={verCardapio}
            >
              Ver Cardápios
            </button>
          </div>
        </div>

        {loading && <p>Carregando cardápios...</p>}
        <div id="cardapio-div" className="flex flex-col lg:flex-row gap-4">
          {cardapios && cardapios.length > 0
            ? cardapios.map((c) => (
                <div key={c._id} className="w-full lg:w-1/3">
                  <Cardapio
                    cardapio={c}
                    loading={false}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))
            : !loading && <p>Nenhum cardápio disponível</p>}
        </div>
        
        <CardapioModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCardapioToEdit(null);
          }}
          onSubmit={cardapioToEdit ? 
            (payload, id) => handleEditCardapio(payload, id) : 
            handleCreateCardapio
          }
          mode={cardapioToEdit ? "edit" : "create"}
          initialData={cardapioToEdit ? convertToModalData(cardapioToEdit) : null}
        />
      </main>
      <Footer />
    </div>
  );
}