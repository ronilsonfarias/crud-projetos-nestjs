// Funções que falam com a NOSSA API REST (NestJS).
// Caminho relativo "/api/tarefas": o container do frontend (Nginx) encaminha
// para o backend que roda na sua máquina (host.docker.internal:3000).
const API = "/api/tarefas";

// Erro de validação: carrega a lista de mensagens que o NestJS devolve no 400.
export class ErroDeValidacao extends Error {
  constructor(mensagens) {
    super("Erro de validação");
    this.mensagens = mensagens;
  }
}

// Lê a resposta e, se o status não for ok, transforma o corpo do NestJS
// ({ message: string | string[], ... }) em um ErroDeValidacao.
async function tratar(resposta) {
  if (resposta.status === 204) return null;
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const msgs = Array.isArray(corpo.message)
      ? corpo.message
      : [corpo.message || "Ocorreu um erro."];
    throw new ErroDeValidacao(msgs);
  }
  return corpo;
}

// GET /api/tarefas
export async function listarTarefas() {
  const resposta = await fetch(API);
  if (!resposta.ok) throw new Error("Falha ao listar tarefas");
  return resposta.json();
}

// POST /api/tarefas  (envia { titulo, descricao })
export async function criarTarefa(dados) {
  const resposta = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return tratar(resposta);
}

// PUT /api/tarefas/:id
export async function atualizarTarefa(id, campos) {
  const resposta = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campos),
  });
  return tratar(resposta);
}

// DELETE /api/tarefas/:id
export async function removerTarefa(id) {
  const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!resposta.ok) throw new Error("Falha ao remover tarefa");
}
