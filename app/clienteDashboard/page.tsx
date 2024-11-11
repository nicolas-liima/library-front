'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Usando o next/navigation aqui

const ClienteDashboard = () => {
  const router = useRouter();

  // Função para navegar para a página de Empréstimos
  const irParaEmprestimos = () => {
    router.push('/clienteDashboard/consultarEmprestimos');
  };

  // Função para navegar para a página de Consultar Livros
  const irParaLivros = () => {
    router.push('/clienteDashboard/consultarLivros');
  };

  // Função para sair e redirecionar para a página de login
  const sair = () => {
    // Aqui você pode limpar os dados de autenticação do usuário, como um token
    // Exemplo: localStorage.removeItem('authToken');
    // ou cookies: Cookies.remove('authToken');
    
    // Redirecionando para a página de login
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Conteúdo Principal */}
      <div className="flex flex-col p-8">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard do Cliente</h1>
          <button
            onClick={sair}
            className="text-blue-500 hover:text-blue-700"
          >
            Sair
          </button>
        </header>

        {/* Botões para navegar */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={irParaLivros}
            className="bg-green-950 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all"
          >
            Consultar Livros
          </button>

          <button
            onClick={irParaEmprestimos}
            className="bg-orange-950 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-all"
          >
            Meus Empréstimos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClienteDashboard;
