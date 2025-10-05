import Api from "./ApiService";

const novoCardapio = {
  data: "2025-01-10",
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

criarCardapio();
