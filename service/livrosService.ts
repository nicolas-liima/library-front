import { api } from './api';  // Certifique-se de importar corretamente a configuração do Axios
import { Livros } from '../types/Livros';  // Importando o tipo de Livros

export const LivrosService = {
  // Buscar livros por título
  buscarLivrosPorTitulo: async (titulo: string): Promise<Livros[]> => {
    try {
      const response = await api.get(`/livros/nome/${titulo}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros por título', error);
      throw error;
    }
  },
  // Buscar todos os livros
  buscarTodosLivros: async (): Promise<Livros[]> => {
    try {
      const response = await api.get('/livros'); // Certifique-se de que a URL está correta no backend
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os livros', error);
      throw error;
    }
  },
  // Buscar livros por autor
  buscarLivrosPorAutor: async (autor: string): Promise<Livros[]> => {
    try {
      const response = await api.get(`/livros/autor/${autor}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros por autor', error);
      throw error;
    }
  },
  
  // Buscar livros por categoria
  buscarLivrosPorCategoria: async (categoria: string): Promise<Livros[]> => {
    try {
      const response = await api.get(`/livros/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros por categoria', error);
      throw error;
    }
  },

  // Buscar livros por ISBN
  buscarLivrosPorIsbn: async (isbn: string): Promise<Livros | null> => {
    try {
      const response = await api.get(`/livros/isbn/${isbn}`);
      return response.data;  // Aqui é possível retornar um único livro ou null se não encontrado
    } catch (error) {
      console.error('Erro ao buscar livros por ISBN', error);
      throw error;
    }
  },

  // Atualizar livro
  atualizarLivro: async (isbnAntigo: string, livroAtualizado: Livros): Promise<void> => {
    try {
      await api.put(`/livros/${isbnAntigo}`, livroAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar livro', error);
      throw error;
    }
  },

  cadastrarLivro: async (livro: Livros): Promise<void> => {
    try {
      // Garantir que não estamos enviando um id ou outros parâmetros desnecessários
      const { id, ...livroSemId } = livro;  // Desestruturação para remover o id (caso exista)
      
      // Agora enviaremos apenas os dados necessários
      const response = await api.post('/livros', livroSemId);
      console.log('Livro cadastrado com sucesso:', response.data);
    } catch (error: any) {
      if (error.response) {
        // Se a resposta de erro do servidor existir
        console.error('Erro ao cadastrar livro:', error.response.data);
        console.error('Status do erro:', error.response.status);
        console.error('Cabeçalhos de resposta:', error.response.headers);
        throw new Error(`Erro ao cadastrar livro: ${error.response.data}`);
      } else if (error.request) {
        // Se a requisição foi feita, mas não houve resposta
        console.error('Erro na requisição:', error.request);
        throw new Error('Erro na requisição ao servidor');
      } else {
        // Caso o erro não tenha as propriedades esperadas
        console.error('Erro desconhecido:', error);  // Mostra o erro detalhado no console
        throw new Error('Erro ao cadastrar livro.');
      }
    }
  }

};
