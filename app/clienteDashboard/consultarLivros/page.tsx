'use client';

import React, { useState, useEffect } from 'react';
import { LivrosService } from '../../../service/livrosService';
import { Livros } from '../../types/Livros';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const ConsultarLivros = () => {
  const [livros, setLivros] = useState<Livros[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtro, setFiltro] = useState('titulo');
  const [termoBusca, setTermoBusca] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const buscarLivros = async () => {
    setErro(null);
    setLoading(true);

    try {
      let livros;
      switch (filtro) {
        case 'titulo':
          livros = termoBusca.trim()
            ? await LivrosService.buscarLivrosPorTitulo(termoBusca)
            : await LivrosService.buscarTodosLivros();
          break;
        case 'autor':
          livros = await LivrosService.buscarLivrosPorAutor(termoBusca);
          break;
        case 'categoria':
          livros = await LivrosService.buscarLivrosPorCategoria(termoBusca);
          break;
        case 'isbn':
          livros = await LivrosService.buscarLivrosPorIsbn(termoBusca);
          break;
        default:
          livros = await LivrosService.buscarTodosLivros();
      }
      setLivros(livros);
    } catch (err) {
      setErro('Erro ao carregar livros.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Consultar Livros</h1>

      {/* Filtro de Busca */}
      <div className="mb-6">
        <label htmlFor="filtro" className="text-lg font-semibold text-gray-900">Escolha o Filtro:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-3 mt-2 bg-white border-2 border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
          <option value="isbn">ISBN</option>
          <option value="categoria">Categoria</option>
        </select>
      </div>

      {/* Campo de Busca */}
      <div className="mb-6">
        <label htmlFor="termoBusca" className="text-lg font-semibold text-gray-900">{`Buscar por ${filtro}:`}</label>
        <input
          id="termoBusca"
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder={`Digite o ${filtro}`}
          className="w-full p-3 mt-2 bg-white border-2 border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Botão de Buscar */}
      <div className="mb-6 text-center">
        <button
          onClick={buscarLivros}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          Buscar
        </button>
      </div>

      {/* Exibir Carregando */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}

      {/* Exibir Erro */}
      {erro && <p className="text-red-600 text-center font-semibold">{erro}</p>}

      {/* Tabela de Livros */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-4 text-left text-gray-900">Título</th>
              <th className="p-4 text-left text-gray-900">Autor</th>
              <th className="p-4 text-left text-gray-900">ISBN</th>
              <th className="p-4 text-left text-gray-900">Categoria</th>
              <th className="p-4 text-left text-gray-900">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {livros.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-600">Nenhum livro encontrado.</td>
              </tr>
            ) : (
              livros.map((livro) => (
                <tr key={livro.isbn} className="hover:bg-indigo-50 transition-all">
                  <td className="p-4 text-gray-900">{livro.titulo}</td>
                  <td className="p-4 text-gray-900">{livro.autor}</td>
                  <td className="p-4 text-gray-900">{livro.isbn}</td>
                  <td className="p-4 text-gray-900">{livro.categoria}</td>
                  <td className="p-4 text-gray-900">{livro.quantidadeEstoque}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarLivros;
