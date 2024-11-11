'use client';

import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useRouter } from 'next/navigation'; // Use next/navigation aqui

const FuncionarioDashboard = () => {
  const router = useRouter();

  // Função para navegar para a página de Usuários
  const irParaUsuarios = () => {
    router.push('/funcionarioDashboard/usuarios');
  };

  // Função para navegar para a página de Livros
  const irParaLivros = () => {
    router.push('/funcionarioDashboard/livros');
  };

  // Função para navegar para a página de Empréstimos
  const irParaEmprestimos = () => {
    router.push('/funcionarioDashboard/emprestimos');
  };

  // Função para navegar para a página de Cadastrar Novo Cliente
  const irParaCadastrarCliente = () => {
    router.push('/funcionarioDashboard/cadastroCliente');
  };

  // Função para navegar para a página de Cadastrar Novo Livro
  const irParaCadastrarLivro = () => {
    router.push('/funcionarioDashboard/cadastroLivro');
  };

  const sair = () => {
    // Aqui você pode limpar os dados de autenticação do usuário, como um token
    // Exemplo: localStorage.removeItem('authToken');
    // ou cookies: Cookies.remove('authToken');
    
    // Redirecionando para a página de login
    router.push('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        className="h-full w-64 bg-black"
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem>
            <button onClick={() => router.push('/funcionarioDashboard')}>Dashboard</button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => router.push('/funcionarioPerfil')}>Perfil</button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => router.push('/funcionarioRelatorios')}>Relatórios</button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => router.push('/funcionarioConfig')}>Configurações</button>
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard do Funcionário</h1>
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

          {/* Botão para Empréstimos */}
          <button
            onClick={irParaEmprestimos}
            className="bg-green-950 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all"
          >
            Ir para Empréstimos
          </button>

          {/* Novo botão para Cadastrar Novo Cliente */}
          <button
            onClick={irParaCadastrarCliente}
            className="bg-yellow-950 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-all"
          >
            Cadastrar Novo Usuário
          </button>

          {/* Novo botão para Cadastrar Livro */}
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
