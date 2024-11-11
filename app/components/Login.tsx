"use client";
import { useState } from "react";
import { api } from "@/service/api"; // Importe o axios do arquivo onde ele foi configurado
import { useRouter } from "next/navigation"; // Para redirecionamento de página

export const Login = () => {
  const [verSenha, setVerSenha] = useState(false);
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");
  const router = useRouter(); // Hook para redirecionamento

  const verificarVerSenha = () => {
    setVerSenha(!verSenha);
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", null, {
        params: {
          username: usuario,
          senha: senha,
        },
      });

      console.log("Login bem-sucedido:", response.data);

      const tipoUsuario = response.data.tipoUsuario;
      console.log("Tipo de usuário retornado:", tipoUsuario);

      // Ajuste para lidar com strings "FUNCIONARIO" e "CLIENTE"
      if (tipoUsuario === "CLIENTE") {
        console.log("Redirecionando para cliente...");
        router.push("/clienteDashboard");
      } else if (tipoUsuario === "FUNCIONARIO") {
        console.log("Redirecionando para funcionário...");
        router.push("/funcionarioDashboard");
      } else {
        console.error("Tipo de usuário inválido:", tipoUsuario);
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response) {
        console.error("Erro na resposta da API:", error.response);
        console.error("Status:", error.response.status);
        console.error("Dados da resposta:", error.response.data);
      } else if (error.request) {
        console.error("Erro na requisição, sem resposta do servidor:", error.request);
      } else {
        console.error("Erro desconhecido:", error.message);
      }
    }
  };

  return (
    <div className="w-1/3 h-auto max-w-xs backdrop-blur-sm shadow-2xl shadow-gray-500 border-4 border-white rounded-md bg-transparent flex flex-col justify-center items-center p-6">
      <h3 className="text-white text-3xl font-extrabold text-center mb-6">
        Faça o seu login
      </h3>
      <div className="w-full">
        <p className="mb-2 text-white">Seu Usuário</p>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={handleUsuarioChange}
          className="w-full h-auto bg-transparent border-2 border-white text-white text-base p-5 mb-5 rounded focus:bg-white focus:border-black focus:text-black"
        />
        <p className="mb-2 text-white">Sua Senha</p>
        <div className="relative">
          {verSenha ? (
            <input
              type="text"
              value={senha}
              onChange={handleSenhaChange}
              placeholder="Senha"
              className="w-full h-auto bg-transparent outline-none border-2 border-white text-white text-base p-5 mb-5 rounded focus:bg-white focus:border-black focus:text-black"
            />
          ) : (
            <input
              type="password"
              value={senha}
              onChange={handleSenhaChange}
              placeholder="Senha"
              className="w-full h-auto bg-transparent outline-none border-2 border-white text-white text-base p-5 mb-5 rounded focus:bg-white focus:border-black focus:text-black"
            />
          )}
          {/* Botão "Ver" dentro do campo de senha */}
          <button
            onClick={verificarVerSenha}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white border-2 border-white p-2 rounded-md hover:bg-white hover:text-black"
          >
            Ver
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="border-2 font-semibold border-white p-4 rounded-full w-full text-white hover:text-black hover:bg-white hover:border-black transition-all"
            onClick={handleLogin} // Chama handleLogin quando clicado
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};
