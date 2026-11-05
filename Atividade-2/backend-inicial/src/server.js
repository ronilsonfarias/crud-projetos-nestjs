import express from "express";
import { db } from "./database.js";

const app = express();
const PORT = 3000;

// Middleware: interpreta o corpo (body) das requisições em JSON.
// Sem isto, req.body ficaria indefinido nos POST/PUT.
app.use(express.json());

// "Banco de dados" em memória (por enquanto, sem banco real).
// Ao reiniciar o servidor, os dados voltam ao estado inicial.
let tarefas = [
  { id: 1, titulo: "Estudar API REST", concluida: false },
];
let proximoId = 2;

// =====================================================================
// AS ROTAS DA API SERÃO CRIADAS DURANTE A AULA.
// Siga o passo a passo em ROTEIRO-AULA.md:
//
//   GET    /api/tarefas          -> listar   (query + header)
//   POST   /api/tarefas          -> criar    (body)
//   PUT    /api/tarefas/:id      -> editar   (path + body)
//   DELETE /api/tarefas/:id      -> excluir  (path)
//
// Escreva as rotas ABAIXO desta linha.
// =====================================================================

app.get("/api/tarefas", async (req, res) => {
  try {
    const resultado = await db.query("SELECT * FROM tarefas ORDER BY id");
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
});

app.post("/api/tarefas", async (req, res) => {
  try {
    const { titulo, concluida } = req.body;

    const resultado = await db.query(
      "INSERT INTO tarefas (titulo, concluida) VALUES ($1, $2) RETURNING *",
      [titulo, concluida ?? false]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar tarefa" });
  }
});


app.put("/api/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, concluida } = req.body;

    const resultado = await db.query(
      "UPDATE tarefas SET titulo = $1, concluida = $2 WHERE id = $3 RETURNING *",
      [titulo, concluida, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
});


app.delete("/api/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await db.query(
      "DELETE FROM tarefas WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ mensagem: "Tarefa excluída", tarefa: resultado.rows[0] });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
});


app.listen(PORT, () => {
  console.log(`API To-Do rodando em http://localhost:${PORT}`);
});
