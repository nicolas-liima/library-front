import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:15001",  // URL do servidor
  timeout: 10000,                     // Timeout aumentado para 10 segundos
  headers: {
    "Content-Type": "application/json",  // Garantir que estamos enviando JSON
  },
});
