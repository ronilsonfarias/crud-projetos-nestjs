
import express from "express";
import { db } from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// LISTAR TAREFAS
app.get("/api/tarefas", async (req, res) => {
  try {
    const resultado = await db.query("SELECT * FROM tarefas ORDER BY id");
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// CRIAR TAREFA
app.post("/api/tarefas", async (req, res) => {
  try {
    const { titulo } = req.body;

    const resultado = await db.query(
      "INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *",
      [titulo]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// EDITAR TAREFA
app.put("/api/tarefas/:id", async (req, res) => {
  try {
    const { titulo, concluida } = req.body;
    const { id } = req.params;

    const resultado = await db.query(
      "UPDATE tarefas SET titulo = $1, concluida = $2 WHERE id = $3 RETURNING *",
      [titulo, concluida, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// EXCLUIR TAREFA
app.delete("/api/tarefas/:id", async (req, res) => {
  try {
    const resultado = await db.query(
      "DELETE FROM tarefas WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ mensagem: "Tarefa excluída com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
