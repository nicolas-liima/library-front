import { api } from './api';  // Importe a configuração do Axios
import { Usuario } from '../types/usuario';  // Defina o tipo de dados (crie se necessário)

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const UsuariosService = {

  // Listar todos os usuários
  listarTodosUsuarios: async (): Promise<Usuario[]> => {
    try {
      const response: ApiResponse<Usuario[]> = await api.get('/usuarios');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao listar usuários', error.message);
        throw new Error('Erro ao listar usuários');
      }
      console.error('Erro desconhecido ao listar usuários', error);
      throw new Error('Erro desconhecido ao listar usuários');
    }
  },

  // Buscar usuários por nome
  buscarUsuariosPorNome: async (nome: string): Promise<Usuario[]> => {
    try {
      const response: ApiResponse<Usuario[]> = await api.get(`/usuarios/nome/${nome}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao buscar usuários por nome: ${nome}`, error.message);
        throw new Error(`Erro ao buscar usuários por nome: ${nome}`);
      }
      console.error('Erro desconhecido ao buscar usuários por nome', error);
      throw new Error(`Erro desconhecido ao buscar usuários por nome: ${nome}`);
    }
  },

  // Buscar usuário por username
  buscarUsuarioPorUsername: async (username: string): Promise<Usuario> => {
    try {
      const response: ApiResponse<Usuario> = await api.get(`/usuarios/username/${username}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao buscar usuário por username: ${username}`, error.message);
        throw new Error(`Erro ao buscar usuário por username: ${username}`);
      }
      console.error('Erro desconhecido ao buscar usuário por username', error);
      throw new Error(`Erro desconhecido ao buscar usuário por username: ${username}`);
    }
  },

  // Buscar usuários por CPF
  buscarUsuariosPorCpf: async (cpf: string): Promise<Usuario[]> => {
    try {
      const response: ApiResponse<Usuario[]> = await api.get(`/usuarios/cpf/${cpf}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao buscar usuários por CPF: ${cpf}`, error.message);
        throw new Error(`Erro ao buscar usuários por CPF: ${cpf}`);
      }
      console.error('Erro desconhecido ao buscar usuários por CPF', error);
      throw new Error(`Erro desconhecido ao buscar usuários por CPF: ${cpf}`);
    }
  },

  // Salvar um novo usuário
  salvarUsuario: async (usuario: Usuario): Promise<string> => {
    try {
      const response: ApiResponse<string> = await api.post('/usuarios', usuario);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao salvar usuário', error.message);
        throw new Error('Erro ao salvar usuário');
      }
      console.error('Erro desconhecido ao salvar usuário', error);
      throw new Error('Erro desconhecido ao salvar usuário');
    }
  },

// Atualizar um usuário existente
atualizarUsuario: async (username: string, usuario: Usuario): Promise<string> => {
  try {
    // Verificar se o tipoUsuario é válido
    if (!usuario.tipoUsuario || (usuario.tipoUsuario !== "CLIENTE" && usuario.tipoUsuario !== "FUNCIONARIO")) {
      throw new Error("Tipo de usuário inválido.");
    }

    // Enviar a requisição PUT
    const response: ApiResponse<string> = await api.put(`/usuarios/${username}`, usuario);
    
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Erro ao atualizar usuário: ${username}`, error.message);
      throw new Error(`Erro ao atualizar usuário: ${username}`);
    }
    console.error('Erro desconhecido ao atualizar usuário', error);
    throw new Error(`Erro desconhecido ao atualizar usuário: ${username}`);
  }
},


  // Remover um usuário
  removerUsuario: async (username: string): Promise<string> => {
    try {
      const response: ApiResponse<string> = await api.delete(`/usuarios/${username}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Erro ao remover usuário: ${username}`, error.message);
        throw new Error(`Erro ao remover usuário: ${username}`);
      }
      console.error('Erro desconhecido ao remover usuário', error);
      throw new Error(`Erro desconhecido ao remover usuário: ${username}`);
    }
  },
  cadastrarUsuario: async (usuario: { username: string, senha: string, tipoUsuario:string, usuarioAtivo:boolean, nome:string, cpf: string, email: string, telegone: string }) => {
    try {
      const response = await api.post('/usuarios', usuario);  // Envia uma requisição POST para o backend
      return response.data;  // Retorna a resposta
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao cadastrar usuário', error.message);
      } else if (error.response) {
        // Captura a resposta da API e loga detalhes do erro
        console.error('Erro ao cadastrar usuário. Detalhes:', error.response);
        throw new Error(`Erro ao cadastrar usuário. Status: ${error.response.status}, Mensagem: ${error.response.data}`);
      } else {
        console.error('Erro desconhecido ao cadastrar usuário', error);
      }
      throw error;  // Lança o erro caso a requisição falhe
    }}
};
