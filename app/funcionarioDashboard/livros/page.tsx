"use client";  // Necessário para usar hooks como useRouter

import React, { useState } from "react";
import { LivrosService } from "../../../service/livrosService";  // Importando o serviço de livros
import { useRouter } from "next/navigation";  // Alteração aqui
import { Livros } from "../../types/Livros";  // Importando a interface de Livros

const LivrosPage = () => {
  const router = useRouter();
  const [filtro, setFiltro] = useState<string>("titulo");
  const [termoBusca, setTermoBusca] = useState<string>("");  // O termo de busca pode ser título, autor, ISBN ou categoria
  const [livros, setLivros] = useState<Livros[]>([]);  // Usando o tipo 'Livros'
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Variáveis para controlar os modais
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState<boolean>(false);
  const [livroEdicao, setLivroEdicao] = useState<Livros | null>(null);

  // Função de busca de livros
  const buscarLivros = async () => {
    setErro(null);
    setLoading(true);
    setHasSearched(true);
    try {
      let livros: Livros[] = [];
      if (filtro === "titulo") {
        livros = await LivrosService.buscarLivrosPorTitulo(termoBusca);
      } else if (filtro === "autor") {
        livros = await LivrosService.buscarLivrosPorAutor(termoBusca);
      } else if (filtro === "isbn") {
        // Se for um único livro, converta para array
        const livro = await LivrosService.buscarLivrosPorIsbn(termoBusca);
        livros = livro ? [livro] : [];
      } else if (filtro === "categoria") {
        livros = await LivrosService.buscarLivrosPorCategoria(termoBusca);  // Nova busca por categoria
      }

      // Verifica se a resposta é um array
      if (!Array.isArray(livros)) {
        throw new Error("A resposta da API não é um array.");
      }

      if (livros.length === 0) {
        setErro("Nenhum livro encontrado.");
      }
      setLivros(livros);
    } catch (err) {
      setErro("Erro ao buscar livros. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para exibir os detalhes do livro
  const exibirDetalhesLivro = (isbn: string) => {
    router.push(`/funcionarioDashboard/livros/${isbn}`);
  };

  // Função para abrir o modal de edição
  const abrirModalEdicao = (livro: Livros) => {
    setLivroEdicao(livro);
    setMostrarModalEdicao(true);
  };

// Função para editar um livro
const editarLivro = async () => {
  if (!livroEdicao) return;

  try {
    // Atualiza o livro usando o ISBN antigo (passado como parâmetro da URL) e o corpo da requisição com os novos dados
    await LivrosService.atualizarLivro(livroEdicao.isbn, livroEdicao); // Passando o isbn antigo e o livro atualizado

    // Atualiza o estado de livros localmente
    setLivros(livros.map((livro) => (livro.isbn === livroEdicao.isbn ? livroEdicao : livro)));

    // Fecha o modal após a edição
    setMostrarModalEdicao(false);
  } catch (err) {
    setErro("Erro ao editar livro.");
    console.error(err);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Buscar Livros</h1>

      {/* Filtro de Busca */}
      <div className="mb-6">
        <label htmlFor="filtro" className="text-lg font-semibold text-gray-700">Escolha o Filtro:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
          <option value="isbn">ISBN</option>
          <option value="categoria">Categoria</option> {/* Adicionando a opção de categoria */}
        </select>
      </div>

      {/* Campo de Busca */}
      <div className="mb-6">
        <label htmlFor="termoBusca" className="text-lg font-semibold text-gray-700">{`Buscar por ${filtro}:`}</label>
        <input
          id="termoBusca"
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder={`Digite o ${filtro}`}
          className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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

      {/* Exibição de Erro */}
      {erro && <p className="text-red-600 text-center font-semibold">{erro}</p>}

      {/* Exibição de Carregamento */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}

      {/* Tabela de Livros */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Autor</th>
              <th className="p-4 text-left">ISBN</th>
              <th className="p-4 text-left">Categoria</th>
              <th className="p-4 text-left">Quantidade</th>
              <th className="p-4 text-left">Disponível</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {hasSearched && livros.length === 0 && !loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-600">Nenhum livro encontrado.</td>
              </tr>
            ) : (
              livros.map((livro) => (
                <tr key={livro.isbn} className="hover:bg-indigo-50 transition-all">
                  <td className="p-4">{livro.titulo}</td>
                  <td className="p-4">{livro.autor}</td>
                  <td className="p-4">{livro.isbn}</td>
                  <td className="p-4">{livro.categoria}</td>
                  <td className="p-4">{livro.quantidadeEstoque}</td>
                  <td className="p-4">{livro.disponivelParaEmprestimo ? 'Sim' : 'Não'}</td>
                  <td className="p-4">
                    <button
                      onClick={() => abrirModalEdicao(livro)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição de Livro */}
      {mostrarModalEdicao && livroEdicao && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Editar Livro</h2>
            {/* ID do Usuário (não editável) */}
            <div className="mb-4">
              <label className="block font-semibold">ID:</label>
              <input
                type="text"
                value={livroEdicao.id}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="titulo" className="block text-gray-700">Título</label>
              <input
                id="titulo"
                type="text"
                value={livroEdicao.titulo}
                onChange={(e) => setLivroEdicao({ ...livroEdicao, titulo: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="autor" className="block text-gray-700">Autor</label>
              <input
                id="autor"
                type="text"
                value={livroEdicao.autor}
                onChange={(e) => setLivroEdicao({ ...livroEdicao, autor: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="isbn" className="block text-gray-700">ISBN</label>
              <input
                id="isbn"
                type="text"
                value={livroEdicao.isbn}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categoria" className="block text-gray-700">Categoria</label>
              <input
                id="categoria"
                type="text"
                value={livroEdicao.categoria}
                onChange={(e) => setLivroEdicao({ ...livroEdicao, categoria: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantidadeEstoque" className="block text-gray-700">Quantidade em Estoque</label>
              <input
                id="quantidadeEstoque"
                type="number"
                value={livroEdicao.quantidadeEstoque}
                onChange={(e) => setLivroEdicao({ ...livroEdicao, quantidadeEstoque: parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setMostrarModalEdicao(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={editarLivro}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivrosPage;
