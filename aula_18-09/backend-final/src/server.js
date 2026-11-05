import express from "express";

const app = express();
const PORT = 3000;

// Middleware: interpreta o corpo (body) das requisições em JSON.
// Sem isto, req.body ficaria indefinido nos POST/PUT.
app.use(express.json());

// "Banco de dados" em memória (por enquanto, sem banco real).
// Ao reiniciar o servidor, os dados voltam ao estado inicial.
let tarefas = [
  { id: 1, titulo: "Estudar API REST", concluida: false },
  { id: 2, titulo: "Preparar a aula de hoje", concluida: true },
];
let proximoId = 3;

// ---------------------------------------------------------------------
// GET /api/tarefas  ->  listar
// Demonstra QUERY (?busca= e ?concluida=) e HEADER de resposta (X-Total-Count).
// ---------------------------------------------------------------------
app.get("/api/tarefas", (req, res) => {
  let resultado = tarefas;

  // Query params (opcionais) vêm em req.query.
  const { busca, concluida } = req.query;

  if (busca) {
    resultado = resultado.filter((t) =>
      t.titulo.toLowerCase().includes(busca.toLowerCase())
    );
  }
  if (concluida !== undefined) {
    resultado = resultado.filter((t) => t.concluida === (concluida === "true"));
  }

  // Header de resposta: quantidade total de itens retornados.
  res.set("X-Total-Count", String(resultado.length));
  res.json(resultado);
});

// ---------------------------------------------------------------------
// GET /api/tarefas/:id  ->  buscar uma (PATH param) + Status Code 404
// ---------------------------------------------------------------------
app.get("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  res.json(tarefa);
});

// ---------------------------------------------------------------------
// POST /api/tarefas  ->  criar (BODY) + Status 201 / validação 400
// ---------------------------------------------------------------------
app.post("/api/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || !titulo.trim()) {
    return res.status(400).json({ erro: "O título é obrigatório" });
  }

  const nova = { id: proximoId++, titulo: titulo.trim(), concluida: false };
  tarefas.push(nova);

  res.status(201).json(nova);
});

// ---------------------------------------------------------------------
// PUT /api/tarefas/:id  ->  editar (PATH + BODY)
// Atualiza o título e/ou o status "concluida".
// ---------------------------------------------------------------------
app.put("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  const { titulo, concluida } = req.body;

  if (titulo !== undefined) {
    if (!titulo.trim()) {
      return res.status(400).json({ erro: "O título não pode ser vazio" });
    }
    tarefa.titulo = titulo.trim();
  }
  if (concluida !== undefined) {
    tarefa.concluida = Boolean(concluida);
  }

  res.json(tarefa);
});

// ---------------------------------------------------------------------
// DELETE /api/tarefas/:id  ->  excluir (PATH) + Status 204
// ---------------------------------------------------------------------
app.delete("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = tarefas.some((t) => t.id === id);

  if (!existe) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas = tarefas.filter((t) => t.id !== id);
  res.status(204).end(); // 204 No Content: sucesso, sem corpo na resposta
});

app.listen(PORT, () => {
  console.log(`API To-Do rodando em http://localhost:${PORT}`);
});
