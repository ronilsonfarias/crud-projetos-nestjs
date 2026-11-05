import { useEffect, useState } from "react";
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  removerTarefa,
} from "./api.js";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [erro, setErro] = useState(false);
  const [nova, setNova] = useState("");

  // Estado da edição inline: qual id está sendo editado e o texto atual.
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  async function carregar() {
    try {
      setErro(false);
      setTarefas(await listarTarefas());
    } catch {
      setErro(true);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function adicionar(e) {
    e.preventDefault();
    const titulo = nova.trim();
    if (!titulo) return;
    try {
      await criarTarefa(titulo);
      setNova("");
      carregar();
    } catch {
      alert("Não foi possível criar. O endpoint POST /api/tarefas já existe?");
    }
  }

  async function alternarConcluida(t) {
    try {
      await atualizarTarefa(t.id, { concluida: !t.concluida });
      carregar();
    } catch {
      alert("Não foi possível atualizar. O endpoint PUT /api/tarefas/:id já existe?");
    }
  }

  function iniciarEdicao(t) {
    setEditandoId(t.id);
    setTextoEdicao(t.titulo);
  }

  function cancelarEdicao() {
    // Cancelar: sai do modo edição sem enviar nada para a API.
    setEditandoId(null);
    setTextoEdicao("");
  }

  async function salvarEdicao(id) {
    const titulo = textoEdicao.trim();
    if (!titulo) {
      cancelarEdicao();
      return;
    }
    try {
      await atualizarTarefa(id, { titulo });
      cancelarEdicao();
      carregar();
    } catch {
      alert("Não foi possível salvar. O endpoint PUT /api/tarefas/:id já existe?");
    }
  }

  async function excluir(id) {
    try {
      await removerTarefa(id);
      carregar();
    } catch {
      alert("Não foi possível excluir. O endpoint DELETE /api/tarefas/:id já existe?");
    }
  }

  return (
    <main className="card">
      <h1>✅ Minhas Tarefas</h1>
      <p className="sub">To-Do List em React consumindo a nossa API REST (Express).</p>

      <form className="form-nova" onSubmit={adicionar}>
        <input
          type="text"
          placeholder="O que precisa ser feito?"
          value={nova}
          onChange={(e) => setNova(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {erro && (
        <div className="aviso">
          Não foi possível carregar as tarefas. Você já implementou{" "}
          <code>GET /api/tarefas</code> na API?
        </div>
      )}

      {!erro && tarefas.length === 0 && (
        <div className="aviso">Nenhuma tarefa ainda. Adicione a primeira!</div>
      )}

      <ul className="lista">
        {tarefas.map((t) =>
          editandoId === t.id ? (
            // ----- Modo edição -----
            <li key={t.id} className="item editando">
              <input
                className="edit-input"
                type="text"
                autoFocus
                value={textoEdicao}
                onChange={(e) => setTextoEdicao(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") salvarEdicao(t.id);
                  if (e.key === "Escape") cancelarEdicao();
                }}
              />
              <button className="btn-ok" title="Salvar" onClick={() => salvarEdicao(t.id)}>
                ✓
              </button>
              <button className="btn-cancel" title="Cancelar" onClick={cancelarEdicao}>
                ✗
              </button>
            </li>
          ) : (
            // ----- Modo normal -----
            <li key={t.id} className={"item" + (t.concluida ? " concluida" : "")}>
              <input
                type="checkbox"
                checked={t.concluida}
                title="Marcar como concluída"
                onChange={() => alternarConcluida(t)}
              />
              <span
                className="titulo"
                title="Clique para editar"
                onClick={() => iniciarEdicao(t)}
              >
                {t.titulo}
              </span>
              <button className="btn-del" title="Excluir" onClick={() => excluir(t.id)}>
                🗑
              </button>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
