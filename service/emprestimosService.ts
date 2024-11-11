// app/service/emprestimosService.ts

import { api } from './api';  // Importando a configuração do Axios
import { Emprestimo } from '../types/emprestimo';  // Importando a interface Emprestimo

export const EmprestimosService = {
  // Criar um novo empréstimo
  criarEmprestimo: async (isbn: string, username: string): Promise<Emprestimo> => {
    try {
      const emprestimo = { isbn, username };
      const response = await api.post('/emprestimos/realizar', emprestimo);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar empréstimo', error);
      throw error;
    }
  },

  // Buscar empréstimos ativos
  buscarEmprestimosAtivos: async (): Promise<Emprestimo[]> => {
    try {
      const response = await api.get('/emprestimos/ativos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empréstimos ativos', error);
      throw error;
    }
  },

    // Buscar empréstimos por usuário (adicionado)
    buscarEmprestimosPorUsername: async (username: string): Promise<Emprestimo[]> => {
      try {
        const response = await api.get(`/emprestimos/username/${username}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar empréstimos por usuário', error);
        throw error;
      }
    },


  // Buscar empréstimos atrasados
  buscarEmprestimosAtrasados: async (): Promise<Emprestimo[]> => {
    try {
      const response = await api.get('/emprestimos/atrasados');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empréstimos atrasados', error);
      throw error;
    }
  },

  // Buscar empréstimos finalizados
  buscarEmprestimosFinalizados: async (): Promise<Emprestimo[]> => {
    try {
      const response = await api.get('/emprestimos/finalizados');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empréstimos finalizados', error);
      throw error;
    }
  },

  // Buscar todos os empréstimos
  buscarTodosOsEmprestimos: async (): Promise<Emprestimo[]> => {
    try {
      const response = await api.get('/emprestimos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empréstimos', error);
      throw error;
    }
  },

  // Buscar empréstimos por usuário
  buscarEmprestimosPorUsuario: async (usuarioId: number): Promise<Emprestimo[]> => {
    try {
      const response = await api.get(`/emprestimos/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empréstimos por usuário', error);
      throw error;
    }
  },

  // Devolver um livro (atualizando a data de devolução)
  devolverLivro: async (emprestimoId: number, dataDevolucao: Date): Promise<Emprestimo> => {
    try {
      const response = await api.put(`/emprestimos/${emprestimoId}/devolucao`, { dataDevolucao });
      return response.data;
    } catch (error) {
      console.error('Erro ao devolver livro', error);
      throw error;
    }
  },

  // Atualizar status de atraso do empréstimo
  cadastrarUsuario: async (usuario: { username: string, senha: string, tipoUsuario: string, usuarioAtivo: boolean, nome: string, cpf: string, email: string, telefone: string }) => {
    try {
      const response = await api.post('/usuarios', usuario);  // Envia a requisição POST para o backend
      return response.data;  // Retorna a resposta
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao cadastrar usuário (capturado):', error.message);
      } else if (error.response) {
        // Logar detalhes adicionais da resposta da API
        console.error('Erro ao cadastrar usuário. Detalhes da resposta:', error.response);
        throw new Error(`Erro ao cadastrar usuário. Status: ${error.response.status}, Mensagem: ${error.response.data}`);
      } else {
        console.error('Erro desconhecido ao cadastrar usuário', error);
      }
      throw error;  // Lança o erro caso a requisição falhe
    }
  }
};
