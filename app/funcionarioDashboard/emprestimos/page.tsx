'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { EmprestimosService } from '../../../service/emprestimosService';
import { Emprestimo } from '../types/emprestimo';

const EmprestimosPage: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('todos');  // Estado para o filtro

  // Função memoizada para buscar empréstimos
  const fetchEmprestimos = useCallback(async () => {
    try {
      let result;
      switch (filter) {
        case 'ativos':
          result = await EmprestimosService.buscarEmprestimosAtivos();
          break;
        case 'atrasados':
          result = await EmprestimosService.buscarEmprestimosAtrasados();
          break;
        case 'finalizados':
          result = await EmprestimosService.buscarEmprestimosFinalizados();
          break;
        default:
          result = await EmprestimosService.buscarTodosOsEmprestimos(); // Buscar todos os empréstimos
      }
      setEmprestimos(result);
    } catch {
      setError('Erro ao carregar empréstimos.');
    } finally {
      setLoading(false);
    }
  }, [filter]);  // Dependência no filtro para refazer a requisição quando mudar

  // Efeito para atualizar a lista de empréstimos sempre que o filtro mudar
  useEffect(() => {
    fetchEmprestimos();
  }, [fetchEmprestimos]);  // Agora a função fetchEmprestimos está na lista de dependências

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">Lista de Empréstimos</h1>
      
      {/* Filtros de status */}
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setFilter('todos')}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('ativos')}
          className="px-4 py-2 bg-green-200 rounded-lg hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Ativos
        </button>
        <button
          onClick={() => setFilter('atrasados')}
          className="px-4 py-2 bg-red-200 rounded-lg hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Atrasados
        </button>
        <button
          onClick={() => setFilter('finalizados')}
          className="px-4 py-2 bg-blue-200 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Finalizados
        </button>
      </div>

      {/* Tabela de empréstimos */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="py-3 px-4 text-left font-medium">ID</th>
              <th className="py-3 px-4 text-left font-medium">ISBN</th>
              <th className="py-3 px-4 text-left font-medium">Username</th>
              <th className="py-3 px-4 text-left font-medium">Data de Empréstimo</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((emprestimo) => (
              <tr key={emprestimo.id} className="hover:bg-indigo-50 transition-all">
                <td className="py-3 px-4">{emprestimo.id}</td>
                <td className="py-3 px-4">{emprestimo.isbn}</td>
                <td className="py-3 px-4">{emprestimo.username}</td>
                <td className="py-3 px-4">{new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  {emprestimo.atrasado ? (
                    <span className="text-red-500 font-semibold">Atrasado</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Ativo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmprestimosPage;
