<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web 2 — Laravel + Blade</title>
    <style>
        /* Estilo embutido para manter a etapa autocontida, mesma identidade visual. */
        * { box-sizing: border-box; }
        body {
            margin: 0; min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            padding: 24px;
            font-family: Arial, Helvetica, sans-serif; color: #0f172a;
            background: radial-gradient(circle at top, #1e293b, #0f172a);
        }
        .card {
            background: #fff; max-width: 640px; width: 100%;
            padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0;
            box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }
        .badge {
            display: inline-block; margin: 0 0 16px; padding: 6px 12px;
            font-size: 13px; font-weight: bold; color: #4f46e5;
            background: #eef2ff; border-radius: 999px;
        }
        h1 { margin: 0 0 4px; font-size: 28px; }
        h2 { margin: 0 0 20px; font-size: 20px; color: #4f46e5; }
        .lead { font-size: 17px; line-height: 1.5; }
        .server-data {
            margin: 24px 0; padding: 20px; background: #0f172a;
            border-radius: 12px; color: #e2e8f0;
        }
        .server-data p { margin: 6px 0; font-family: "Courier New", monospace; }
        .server-data .label { color: #94a3b8; font-size: 13px; }
        .server-data .value { font-size: 20px; font-weight: bold; }
        .hint {
            color: #64748b; font-size: 15px; line-height: 1.6;
            border-top: 1px solid #e2e8f0; padding-top: 20px;
        }
        code {
            font-family: "Courier New", monospace; background: #eef2ff;
            color: #4f46e5; padding: 2px 6px; border-radius: 4px; font-size: 13px;
        }
    </style>
</head>
<body>
    <main class="card">
        <p class="badge">Etapa 03 · Server-Side Rendering</p>
        <h1>Olá do Laravel!</h1>
        <h2>Disciplina: {{ $disciplina }}</h2>

        <p class="lead">Esta página foi renderizada <strong>no servidor</strong>.</p>

        <div class="server-data">
            <p class="label">Horário do servidor (recalculado a cada requisição):</p>
            <p class="value">{{ $hora->format('d/m/Y H:i:s') }}</p>

            <p class="label">Número gerado pelo servidor:</p>
            <p class="value">{{ $numero }}</p>
        </div>

        <p class="hint">
            Atualize a página (F5) várias vezes: o horário e o número mudam porque
            o PHP executa novamente e o Blade gera um novo HTML a cada requisição.
            Use <code>Exibir código-fonte da página</code> — você verá apenas HTML,
            nunca a sintaxe <code>@{{ $disciplina }}</code> do Blade.
        </p>
    </main>
</body>
</html>
