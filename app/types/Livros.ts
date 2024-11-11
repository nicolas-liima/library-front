// app/types/Livros.ts
export interface Livros {
    id: number;  // Usando 'number' em vez de 'int'
    titulo: string;
    autor: string;
    categoria: string;
    quantidadeEstoque: number;  // Usando 'number' em vez de 'int'
    isbn: string;
    disponivelParaEmprestimo: boolean;
  }
  