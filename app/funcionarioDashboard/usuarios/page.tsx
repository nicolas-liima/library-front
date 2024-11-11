"use client";

import React, { useState } from "react";
import { UsuariosService } from "../../../service/usuariosService";
import { Usuario } from "../../types/usuario";
import { useRouter } from "next/navigation";

const UsuariosPage = () => {
  const router = useRouter();
  const [filtro, setFiltro] = useState<string>("nome");
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Modal de detalhes do usuário
  const [usuarioDetalhado, setUsuarioDetalhado] = useState<Usuario | null>(null);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  const buscarUsuarios = async () => {
    setErro(null);
    setLoading(true);
    setHasSearched(true);
    try {
      let usuarios: Usuario[] = [];
      if (filtro === "nome") {
        usuarios = await UsuariosService.buscarUsuariosPorNome(termoBusca);
      } else if (filtro === "cpf") {
        usuarios = await UsuariosService.buscarUsuariosPorCpf(termoBusca);
      } else if (filtro === "username") {
        const usuario = await UsuariosService.buscarUsuarioPorUsername(termoBusca);
        usuarios = usuario ? [usuario] : [];
      }

      if (usuarios.length === 0) {
        setErro("Nenhum usuário encontrado.");
      }

      setUsuarios(usuarios); // Atualiza a lista de usuários com o resultado da busca
    } catch (err: any) {
      // Verifica se o erro foi causado por um usuário não encontrado
      if (err.response && err.response.status === 404) {
        setErro("Usuário não encontrado.");
      } else {
        setErro("Erro ao buscar usuários.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exibirDetalhesUsuario = async (username: string) => {
    try {
      const usuario = await UsuariosService.buscarUsuarioPorUsername(username);
      setUsuarioDetalhado(usuario);
      setMostrarModal(true);
    } catch (error: any) {
      console.error("Erro ao carregar detalhes do usuário:", error);
      if (error.response && error.response.status === 404) {
        setErro("Usuário não encontrado.");
      } else {
        setErro("Erro ao carregar detalhes do usuário.");
      }
    }
  };

  const atualizarUsuario = async () => {
    if (!usuarioDetalhado) return;

    try {
      await UsuariosService.atualizarUsuario(usuarioDetalhado.username, usuarioDetalhado);
      setMostrarModal(false); // Fechar modal após salvar
      buscarUsuarios(); // Atualizar lista de usuários após salvar
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      setErro("Erro ao atualizar usuário.");
      // Aqui você pode verificar se o erro é algo específico, como uma falha de validação.
      if (error.response && error.response.data) {
        setErro(error.response.data.message || "Erro ao atualizar usuário.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Buscar Usuários</h1>

      {/* Filtro de Busca */}
      <div className="mb-6">
        <label htmlFor="filtro" className="text-lg font-semibold text-gray-700">Escolha o Filtro:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="nome">Nome</option>
          <option value="cpf">CPF</option>
          <option value="username">Username</option>
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
          onClick={buscarUsuarios}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          Buscar
        </button>
      </div>

      {/* Exibição de Erro */}
      {erro && <p className="text-red-600 text-center font-semibold">{erro}</p>}

      {/* Exibição de Carregamento */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}

      {/* Tabela de Usuários */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">CPF</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {hasSearched && usuarios.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-600">Nenhum usuário encontrado.</td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.username} className="hover:bg-indigo-50 transition-all">
                  <td className="p-4">{usuario.username}</td>
                  <td className="p-4">{usuario.nome}</td>
                  <td className="p-4">{usuario.cpf}</td>
                  <td className="p-4">
                    <button
                      onClick={() => exibirDetalhesUsuario(usuario.username)}
                      className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

{/* Modal de Detalhes do Usuário */}
{mostrarModal && usuarioDetalhado && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Usuário</h2>
      
      {/* ID do Usuário (não editável) */}
      <div className="mb-4">
        <label className="block font-semibold">ID:</label>
        <input
          type="text"
          value={usuarioDetalhado.id}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Username (não editável) */}
      <div className="mb-4">
        <label className="block font-semibold">Username:</label>
        <input
          type="text"
          value={usuarioDetalhado.username}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Nome */}
      <div className="mb-4">
        <label className="block font-semibold">Nome:</label>
        <input
          type="text"
          value={usuarioDetalhado.nome}
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, nome: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* CPF */}
      <div className="mb-4">
        <label className="block font-semibold">CPF:</label>
        <input
          type="text"
          value={usuarioDetalhado.cpf || ""}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Senha */}
      <div className="mb-4">
        <label className="block font-semibold">Senha:</label>
        <input
          type="password"
          value={usuarioDetalhado.senha || ""}
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, senha: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Tipo de Usuário */}
      <div className="mb-4">
        <label className="block font-semibold">Tipo de Usuário:</label>
        <select
          value={usuarioDetalhado.tipoUsuario || ""} // Corrigido para tipoUsuario
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, tipoUsuario: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione</option>
          <option value="CLIENTE">Cliente</option> {/* Corrigido para CLIENTE */}
          <option value="FUNCIONARIO">Funcionário</option> {/* Corrigido para FUNCIONARIO */}
        </select>
      </div>


      {/* Usuário Ativo */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={usuarioDetalhado.usuarioAtivo}
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, usuarioAtivo: e.target.checked })}
          className="mr-2"
        />
        <label className="font-semibold">Usuário Ativo</label>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-semibold">Email:</label>
        <input
          type="email"
          value={usuarioDetalhado.email || ""}
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Endereço */}
      <div className="mb-4">
        <label className="block font-semibold">Endereço:</label>
        <input
          type="text"
          value={usuarioDetalhado.endereco || ""}
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, endereco: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Telefone */}
      <div className="mb-4">
        <label className="block font-semibold">Telefone:</label>
        <input
          type="text"
          value={usuarioDetalhado.telefone || ""}
          onChange={(e) => setUsuarioDetalhado({ ...usuarioDetalhado, telefone: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end">
        <button
          onClick={() => setMostrarModal(false)}
          className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          onClick={atualizarUsuario}
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

export default UsuariosPage;
