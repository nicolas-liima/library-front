// app/types/emprestimo.ts

import { Livro } from './livro';  // Importando a interface Livro
import { Usuario } from './usuario';  // Importando a interface Usuario

export interface Emprestimo {
  id: number;
  livro: Livro;  // Um objeto do tipo Livro
  usuario: Usuario;  // Um objeto do tipo Usuario
  dataEmprestimo: Date;  // Data do empréstimo
  dataDevolucaoPrevista: Date;  // Data prevista para devolução
  dataDevolucaoEfetiva: Date | null;  // Data efetiva de devolução ou null se ainda não devolvido
  atrasado: boolean;  // Se o empréstimo está atrasado
  emprestimoAtivo: boolean;  // Se o empréstimo ainda está ativo
}
