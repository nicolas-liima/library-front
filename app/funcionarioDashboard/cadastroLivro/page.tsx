'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation para navegação
import { LivrosService } from '../../../service/LivrosService';  // Verifique o caminho correto do arquivo


const CadastrarLivro: React.FC = () => {
  const router = useRouter();

  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    quantidadeEstoque: 0,
    isbn: '',
  });

  // Estado para controle de erros e sucesso
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Função para atualizar os valores do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLivro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setError(null); // Limpar erros anteriores
    setSuccess(null); // Limpar sucesso anterior

    // Evitar enviar o campo id
    const livroData = {
      titulo: livro.titulo,
      autor: livro.autor,
      categoria: livro.categoria,
      quantidadeEstoque: livro.quantidadeEstoque,
      isbn: livro.isbn,
    };

    // Chama a função para cadastrar o livro
    await LivrosService.cadastrarLivro(livroData);
    
    setSuccess("Livro cadastrado com sucesso.");
    setTimeout(() => {
      router.push('/funcionarioDashboard/livros');
    }, 2000);
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(`Erro: ${error.message}`);
    } else {
      setError('Erro desconhecido ao cadastrar livro. Tente novamente.');
    }
    console.error(error);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">Cadastrar Livro</h1>

        {error && <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">{error}</div>}
        {success && <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded">{success}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="titulo"
              value={livro.titulo}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 focus:text-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Autor</label>
            <input
              type="text"
              name="autor"
              value={livro.autor}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 focus:text-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <input
              type="text"
              name="categoria"
              value={livro.categoria}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 focus:text-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
            <input
              type="number"
              name="quantidadeEstoque"
              value={livro.quantidadeEstoque}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 focus:text-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={livro.isbn}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 focus:text-blue-500"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarLivro;
