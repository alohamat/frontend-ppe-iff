import Api from "./ApiService";
import type { CardapioData } from "../components/Cardapio";

const novoCardapio = {
  data: "2025-01-25",
  refeicoes: [
    {
      tipo_refeicao: "almoco",
      comida: "frango com arroz e feijão",
      bebida: "suco de manga",
    },
    {
      tipo_refeicao: "cafe",
      comida: "biscoito pitstop",
      bebida: "suco de maracujá",
    },
  ],
};

export async function criarCardapio() {
  const token = localStorage.getItem("token");
  try {
    const res = await Api.post("cardapios/", novoCardapio, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ Cardápio criado:", res.data);
  } catch (err: any) {
    console.error(
      "Erro ao criar cardápio:",
      err.response?.status,
      err.response?.data
    );
  }
}


export async function getCardapiosDeHoje(): Promise<CardapioData[]> {
  const token = localStorage.getItem("token");
  try {
    const res = await Api.get("cardapios/hoje", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.cardapios; // pega o array dentro do objeto
  } catch (err: any) {
    console.error("Erro ao puxar cardápios", err.response?.data || err.message);
    return [];
  }
}

