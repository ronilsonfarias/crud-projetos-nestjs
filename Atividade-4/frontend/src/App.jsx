import { useEffect, useState } from "react";
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  removerTarefa,
  ErroDeValidacao,
} from "./api.js";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [erroLista, setErroLista] = useState(false);

  // Formulário de criação.
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erros, setErros] = useState([]); // mensagens de validação do backend

  // Edição inline do título.
  const [editandoId, setEditandoId] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  async function carregar() {
    try {
      setErroLista(false);
      setTarefas(await listarTarefas());
    } catch {
      setErroLista(true);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function adicionar(e) {
    e.preventDefault();
    setErros([]);
    try {
      await criarTarefa({ titulo, descricao: descricao || undefined });
      setTitulo("");
      setDescricao("");
      carregar();
    } catch (err) {
      if (err instanceof ErroDeValidacao) setErros(err.mensagens);
      else setErros(["Não foi possível criar a tarefa."]);
    }
  }

  async function alternarConcluida(t) {
    try {
      await atualizarTarefa(t.id, { concluida: !t.concluida });
      carregar();
    } catch {
      /* ignorado para simplificar */
    }
  }

  function iniciarEdicao(t) {
    setEditandoId(t.id);
    setTextoEdicao(t.titulo);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setTextoEdicao("");
  }

  async function salvarEdicao(id) {
    try {
      await atualizarTarefa(id, { titulo: textoEdicao });
      cancelarEdicao();
      carregar();
    } catch (err) {
      const msg =
        err instanceof ErroDeValidacao ? err.mensagens.join(" ") : "Erro ao salvar.";
      alert(msg);
    }
  }

  async function excluir(id) {
    try {
      await removerTarefa(id);
      carregar();
    } catch {
      /* ignorado */
    }
  }

  return (
    <main className="card">
      <h1>✅ Minhas Tarefas</h1>
      <p className="sub">To-Do List em React consumindo a nossa API NestJS.</p>

      <form className="form-nova" onSubmit={adicionar}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição (opcional)"
          rows={2}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Adicionar</button>

        {erros.length > 0 && (
          <ul className="erros">
            {erros.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        )}
      </form>

      {erroLista && (
        <div className="aviso">
          Não foi possível carregar as tarefas. Você já implementou{" "}
          <code>GET /api/tarefas</code> no NestJS?
        </div>
      )}

      {!erroLista && tarefas.length === 0 && (
        <div className="aviso">Nenhuma tarefa ainda. Adicione a primeira!</div>
      )}

      <ul className="lista">
        {tarefas.map((t) =>
          editandoId === t.id ? (
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
            <li key={t.id} className={"item" + (t.concluida ? " concluida" : "")}>
              <input
                type="checkbox"
                checked={t.concluida}
                title="Marcar como concluída"
                onChange={() => alternarConcluida(t)}
              />
              <div className="conteudo">
                <span className="titulo" title="Clique para editar" onClick={() => iniciarEdicao(t)}>
                  {t.titulo}
                </span>
                {t.descricao && <span className="descricao">{t.descricao}</span>}
              </div>
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
