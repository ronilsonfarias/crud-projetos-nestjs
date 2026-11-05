<?php

use Illuminate\Support\Facades\Route;

// Acessar a raiz redireciona para a rota didática da aula.
Route::get('/', function () {
    return redirect('/ola');
});

// Rota que demonstra SERVER-SIDE RENDERING.
//
// Todo o código abaixo roda NO SERVIDOR, a cada requisição:
//   - now() calcula o horário atual do servidor;
//   - random_int() gera um número aleatório no backend;
//   - view('ola', ...) manda o Blade montar o HTML final.
//
// O navegador recebe apenas HTML pronto — nunca vê o código Blade.
Route::get('/ola', function () {
    return view('ola', [
        'disciplina' => 'Programação para Web 2',
        'hora' => now()->timezone('America/Sao_Paulo'),
        'numero' => random_int(1000, 9999),
    ]);
});
