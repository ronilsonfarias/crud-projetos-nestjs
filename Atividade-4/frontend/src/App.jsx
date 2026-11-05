
import { useState } from "react";

import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  removerTarefa,
  cadastrarUsuario,
  login,
  logout,
  ErroDeValidacao,
} from "./api.js";

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [tarefas, setTarefas] = useState([]);
  const [erroLista, setErroLista] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erros, setErros] = useState([]);

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

  async function entrar(e) {
    e.preventDefault();
    setMensagem("");

    try {
      await login({ email, password: senha });
      setAutenticado(true);
      setSenha("");
      await carregar();
    } catch (err) {
      setMensagem(
        err instanceof ErroDeValidacao
          ? err.mensagens.join(" ")
          : "E-mail ou senha inválidos."
      );
    }
  }

  async function cadastrar(e) {
    e.preventDefault();
    setMensagem("");

    try {
      await cadastrarUsuario({ email, password: senha });
      setMensagem("Cadastro realizado! Agora faça seu login.");
      setModoCadastro(false);
      setSenha("");
    } catch (err) {
      setMensagem(
        err instanceof ErroDeValidacao
          ? err.mensagens.join(" ")
          : "Não foi possível realizar o cadastro."
      );
    }
  }

  async function sair() {
    try {
      await logout();
    } finally {
      setAutenticado(false);
      setTarefas([]);
      setEmail("");
      setSenha("");
      setMensagem("Você saiu do sistema.");
    }
  }

  async function adicionar(e) {
    e.preventDefault();
    setErros([]);

    try {
      await criarTarefa({
        titulo,
        descricao: descricao || undefined,
      });

      setTitulo("");
      setDescricao("");
      await carregar();
    } catch (err) {
      if (err instanceof ErroDeValidacao) {
        setErros(err.mensagens);
      } else {
        setErros(["Não foi possível criar a tarefa."]);
      }
    }
  }

  async function alternarConcluida(t) {
    try {
      await atualizarTarefa(t.id, {
        concluida: !t.concluida,
      });
      await carregar();
    } catch {
      setErros(["Não foi possível atualizar a tarefa."]);
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
      await carregar();
    } catch {
      alert("Erro ao salvar a tarefa.");
    }
  }

  async function excluir(id) {
    try {
      await removerTarefa(id);
      await carregar();
    } catch {
      setErros(["Não foi possível excluir a tarefa."]);
    }
  }

  if (!autenticado) {
    return (
      <main className="card">
        <h1>🔐 Gerenciador de Tarefas</h1>

        <h2>{modoCadastro ? "Criar conta" : "Entrar no sistema"}</h2>

        <form onSubmit={modoCadastro ? cadastrar : entrar}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <button
          type="button"
          onClick={() => {
            setModoCadastro(!modoCadastro);
            setMensagem("");
          }}
        >
          {modoCadastro
            ? "Já tenho conta. Fazer login"
            : "Ainda não tenho conta. Cadastrar"}
        </button>
      </main>
    );
  }

  return (
    <main className="card">
      <h1>✅ Minhas Tarefas</h1>

      <p className="sub">
        To-Do List em React consumindo a API NestJS.
      </p>

      <button type="button" onClick={sair}>
        Sair do sistema
      </button>

      <form className="form-nova" onSubmit={adicionar}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
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
          Não foi possível carregar as tarefas.
          Verifique sua autenticação e a conexão com a API.
        </div>
      )}

      {!erroLista && tarefas.length === 0 && (
        <div className="aviso">
          Nenhuma tarefa ainda. Adicione a primeira!
        </div>
      )}

      <ul className="lista">
        {tarefas.map((t) =>
          editandoId === t.id ? (
            <li key={t.id} className="item editando">
              <input
                className="edit-input"
                value={textoEdicao}
                onChange={(e) => setTextoEdicao(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") salvarEdicao(t.id);
                  if (e.key === "Escape") cancelarEdicao();
                }}
              />

              <button onClick={() => salvarEdicao(t.id)}>
                ✓
              </button>

              <button onClick={cancelarEdicao}>
                ✗
              </button>
            </li>
          ) : (
            <li
              key={t.id}
              className={"item" + (t.concluida ? " concluida" : "")}
            >
              <input
                type="checkbox"
                checked={t.concluida}
                onChange={() => alternarConcluida(t)}
              />

              <div className="conteudo">
                <span
                  className="titulo"
                  onClick={() => iniciarEdicao(t)}
                >
                  {t.titulo}
                </span>

                {t.descricao && (
                  <span className="descricao">{t.descricao}</span>
                )}
              </div>

              <button
                className="btn-del"
                onClick={() => excluir(t.id)}
              >
                🗑
              </button>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
