"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usando o next/navigation para navegação
import { UsuariosService } from '../../../service/UsuariosService';  // Verifique o caminho correto do arquivo

const CadastrarUsuario: React.FC = () => {
  const router = useRouter();

  // Estado para armazenar os dados do formulário
  const [usuario, setUsuario] = useState({
    username: '',
    senha: '',
    tipoUsuario: 'comum', // Tipo padrão de usuário
    usuarioAtivo: true, // Definindo usuário como ativo por padrão
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '' // Adicionando o campo "endereco"
  });

  // Estado para controle de erros e sucesso
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Função para atualizar os valores do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      // Remove caracteres não numéricos
      const numericValue = value.replace(/\D/g, "");
  
      // Limita o número de dígitos para (DDD) XXXXX-XXXX
      if (numericValue.length > 11) numericValue = numericValue.slice(0, 11);
  
      // Aplica a máscara de (DDD) XXXXX-XXXX
      const formattedValue = numericValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: formattedValue,
      }));
    } else if (name === 'cpf') {
      const formattedCpf = formatCpf(value);
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: formattedCpf,
      }));
    } else {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: value,
      }));
    }
  };

  // Função para formatar o CPF
  const formatCpf = (cpf: string) => {
    return cpf
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formata o CPF
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError(null); // Limpar erros anteriores
      setSuccess(null); // Limpar sucesso anterior

      // Montando o objeto com todos os campos necessários
      const usuarioData = {
        username: usuario.username,
        senha: usuario.senha,
        tipoUsuario: usuario.tipoUsuario === 'comum' ? 'FUNCIONARIO' : 'CLIENTE', // Traduzindo o tipo
        usuarioAtivo: usuario.usuarioAtivo,
        nome: usuario.nome,
        cpf: usuario.cpf,
        email: usuario.email,
        endereco: usuario.endereco, // Garantindo que o campo 'endereco' seja enviado
        telefone: usuario.telefone,
      };

      const response = await UsuariosService.cadastrarUsuario(usuarioData);
      setSuccess(response); // Exibindo mensagem de sucesso

      // Após o sucesso, redireciona para a página de usuários
      setTimeout(() => {
        router.push('/funcionarioDashboard');
      }, 2000);
    } catch (error: unknown) {
      if (error.response) {
        // Captura o erro retornado pela API
        setError(`Erro: ${error.response.data}`);
      } else if (error instanceof Error) {
        // Captura outros erros
        setError(`Erro: ${error.message}`);
      } else {
        setError('Erro desconhecido ao cadastrar usuário. Tente novamente.');
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-400">
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Cadastrar Usuário</h1>
  
        {error && <div className="mt-4 p-4 bg-red-100 text-red border border-red-300 rounded text-black">{error}</div>}
        {success && <div className="mt-4 p-4 bg-green-100 text border border-green-300 rounded text-black">{success}</div>}
  
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-lg font-semibold text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Digite o Username"
              name="username"
              value={usuario.username}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
            />
          </div>
  
          <div>
            <label className="text-lg font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite a Senha"
              name="senha"
              value={usuario.senha}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
            />
          </div>
  
          <div>
            <label className="text-lg font-semibold text-gray-700">Tipo de Usuário</label>
            <select
              name="tipoUsuario"
              value={usuario.tipoUsuario}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md focus:outline-none text-gray-800 focus:border-black transition-all"
            >
              <option value="comum">Funcionário</option>
              <option value="admin">Cliente</option>
            </select>
          </div>
  
          {/* Repita o mesmo ajuste para os campos a seguir */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              placeholder="Digite o Nome"
              name="nome"
              value={usuario.nome}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
            />
          </div>
  
          <div>
            <label className="text-lg font-semibold text-gray-700">CPF</label>
            <input
              type="text"
              placeholder="Digite o CPF"
              name="cpf"
              value={usuario.cpf}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
              maxLength={14}
            />
          </div>
  
          <div>
            <label className="text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Digite o Email"
              name="email"
              value={usuario.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
            />
          </div>
  
          <div>
            <label className="text-lg font-semibold text-gray-700">Telefone</label>
            <input
              type="text"
              placeholder="Digite o Telefone"
              name="telefone"
              value={usuario.telefone}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
            />
          </div>
  
          <div>
            <label className="text-lg font-semibold text-gray-700">Endereço</label>
            <input
              type="text"
              placeholder="Digite o Endereço"
              name="endereco"
              value={usuario.endereco}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-2 bg-white border-2 border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black transition-all"
            />
          </div>
  
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CadastrarUsuario;