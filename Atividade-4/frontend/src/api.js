
const API = "/api/tarefas";
const AUTH = "/api/auth";

export class ErroDeValidacao extends Error {
  constructor(mensagens) {
    super("Erro de validação");
    this.mensagens = mensagens;
  }
}

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

// CADASTRO
export async function cadastrarUsuario(dados) {
  const resposta = await fetch(`${AUTH}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return tratar(resposta);
}

// LOGIN
export async function login(dados) {
  const resposta = await fetch(`${AUTH}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return tratar(resposta);
}

// LOGOUT
export async function logout() {
  const resposta = await fetch(`${AUTH}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return tratar(resposta);
}

// LISTAR TAREFAS
export async function listarTarefas() {
  const resposta = await fetch(API, {
    credentials: "include",
  });

  return tratar(resposta);
}

// CRIAR TAREFA
export async function criarTarefa(dados) {
  const resposta = await fetch(API, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return tratar(resposta);
}

// ATUALIZAR TAREFA
export async function atualizarTarefa(id, campos) {
  const resposta = await fetch(`${API}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campos),
  });

  return tratar(resposta);
}

// REMOVER TAREFA
export async function removerTarefa(id) {
  const resposta = await fetch(`${API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return tratar(resposta);
}
