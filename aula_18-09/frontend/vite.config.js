import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O React roda no Vite (porta 5173) e a API no Express (porta 3000).
// O "proxy" abaixo faz o Vite encaminhar toda chamada que começa com /api
// para http://localhost:3000. Assim o frontend usa caminhos relativos
// (fetch("/api/tarefas")) e NÃO precisamos configurar CORS durante a aula.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
