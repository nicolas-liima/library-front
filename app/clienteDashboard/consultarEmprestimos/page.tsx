'use client';

import React, { useState, useEffect } from 'react';
import { EmprestimosService } from '../../../service/emprestimosService';  // Certifique-se de que o caminho está correto
import { Emprestimo } from '../types/emprestimo';  // Interface de empréstimos

const ConsultarEmprestimos = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmprestimos = async () => {
      setLoading(true);
      setErro(null);

      try {
        // Busca todos os empréstimos (ajuste conforme o método da sua API)
        const emprestimosData = await EmprestimosService.buscarTodosEmprestimos();
        setEmprestimos(emprestimosData);
      } catch (err) {
        setErro('Erro ao carregar empréstimos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Meus Empréstimos</h1>

      {/* Exibir Carregando */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}

      {/* Exibir Erro */}
      {erro && <p className="text-red-600 text-center font-semibold">{erro}</p>}

      {/* Tabela de Empréstimos */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-4 text-left">Título do Livro</th>
              <th className="p-4 text-left">Data de Empréstimo</th>
              <th className="p-4 text-left">Data de Devolução</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-600">Nenhum empréstimo encontrado.</td>
              </tr>
            ) : (
              emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id} className="hover:bg-indigo-50 transition-all">
                  <td className="p-4">{emprestimo.livroTitulo}</td>
                  <td className="p-4">{new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(emprestimo.dataDevolucao).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultarEmprestimos;
