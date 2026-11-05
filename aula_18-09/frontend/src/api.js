// Funções que falam com a NOSSA API REST.
// Usamos caminho relativo "/api/tarefas": em desenvolvimento, o proxy do Vite
// encaminha para http://localhost:3000 (veja vite.config.js).
const API = "/api/tarefas";

// GET /api/tarefas — listar
export async function listarTarefas() {
  const resposta = await fetch(API);
  if (!resposta.ok) throw new Error("Falha ao listar tarefas");
  return resposta.json();
}

// POST /api/tarefas — criar (envia o título no body)
export async function criarTarefa(titulo) {
  const resposta = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo }),
  });
  if (!resposta.ok) throw new Error("Falha ao criar tarefa");
  return resposta.json();
}

// PUT /api/tarefas/:id — editar (id no path, campos no body)
export async function atualizarTarefa(id, campos) {
  const resposta = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campos),
  });
  if (!resposta.ok) throw new Error("Falha ao atualizar tarefa");
  return resposta.json();
}

// DELETE /api/tarefas/:id — excluir (id no path)
export async function removerTarefa(id) {
  const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!resposta.ok) throw new Error("Falha ao remover tarefa");
}
