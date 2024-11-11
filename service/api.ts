import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:15001",   // URL do servidor
  timeout: 10000,                      // Timeout de 10 segundos
  headers: {
    "Content-Type": "application/json", // Garantir envio em JSON
  },
});

// Interceptor de resposta para tratar erros de forma personalizada
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      // Tratamento de erros conforme o código de status
      switch (status) {
        case 401:
          console.error("Erro de autenticação (401): Acesso não autorizado.");
          return Promise.reject(new Error("Acesso não autorizado. Faça login novamente."));
        case 404:
          console.error("Erro 404: Recurso não encontrado.");
          return Promise.reject(new Error("Recurso não encontrado."));
        case 500:
          console.error("Erro no servidor (500).");
          return Promise.reject(new Error("Erro no servidor. Tente novamente mais tarde."));
        default:
          console.error(`Erro ${status}: ${data}`);
          return Promise.reject(new Error("Ocorreu um erro. Tente novamente."));
      }
    } else if (error.request) {
      console.error("Erro de rede ou sem resposta do servidor.");
      return Promise.reject(new Error("Erro de rede. Verifique sua conexão."));
    } else {
      console.error("Erro na configuração da requisição:", error.message);
      return Promise.reject(new Error("Erro ao configurar a requisição."));
    }
  }
);
