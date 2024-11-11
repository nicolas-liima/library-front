'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const FuncionarioDashboard = () => {
  const router = useRouter();

  // Funções de navegação
  const irParaUsuarios = () => {
    router.push('/funcionarioDashboard/usuarios');
  };

  const irParaLivros = () => {
    router.push('/funcionarioDashboard/livros');
  };

  const irParaEmprestimos = () => {
    router.push('/funcionarioDashboard/emprestimos');
  };

  const irParaCadastrarCliente = () => {
    router.push('/funcionarioDashboard/cadastroCliente');
  };

  const irParaCadastrarLivro = () => {
    router.push('/funcionarioDashboard/cadastroLivro');
  };

  const sair = () => {
    // Limpeza dos dados de autenticação (se houver)
    // Exemplo: localStorage.removeItem('authToken');
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard do Funcionário</h1>
        <button
          onClick={sair}
          className="text-blue-500 hover:text-blue-700"
        >
          Sair
        </button>
      </header>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        {/* Botões de Navegação */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={irParaUsuarios}
            className="bg-red-950 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all"
          >
            Ir para Usuários
          </button>

          <button
            onClick={irParaLivros}
            className="bg-blue-950 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all"
          >
            Ir para Livros
          </button>

          <button
            onClick={irParaEmprestimos}
            className="bg-green-950 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all"
          >
            Ir para Empréstimos
          </button>

          <button
            onClick={irParaCadastrarCliente}
            className="bg-yellow-950 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-all"
          >
            Cadastrar Novo Usuário
          </button>

          <button
            onClick={irParaCadastrarLivro}
            className="bg-purple-950 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition-all"
          >
            Cadastrar Novo Livro
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuncionarioDashboard;


