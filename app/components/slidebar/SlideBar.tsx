"use client";
import { useState } from "react";
import { api } from "@/service/api"; // Importe o axios do arquivo onde ele foi configurado

export const Login = () => {
  const [verSenha, setVerSenha] = useState(false);
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState("");

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
      const response = await api.post("/login", {
        usuario,
        senha,
      });
      console.log("Login bem-sucedido:", response.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="w-1/2 h-2/3 backdrop-blur-sm shadow-2xl shadow-gray-500 border-4 border-white rounded-md bg-transparent flex flex-col justify-evenly items-center p-4">
      <h2 className="text-white text-5xl font-bold border-b-2 border-gray-400 w-80 p-2 text-center">
        LOGIN
      </h2>
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
        {verSenha ? (
          <input
            type="text"
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Senha"
            className="w-5/6 h-auto bg-transparent outline-none border-2 border-white text-white text-base p-5 mb-5 rounded focus:bg-white focus:border-black focus:text-black"
          />
        ) : (
          <input
            type="password"
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Senha"
            className="w-5/6 h-auto bg-transparent outline-none border-2 border-white text-white text-base p-5 mb-5 rounded focus:bg-white focus:border-black focus:text-black"
          />
        )}
        <button
          className="w-auto rounded-sm ml-4 p-4 border-2 border-white"
          onClick={verificarVerSenha}
        >
          {verSenha ? 'ESCONDER' : 'VER'}
        </button>
        <div className="flex justify-center">
          <button
            className="border-2 font-semibold border-white p-4 rounded-full w-52 text-white hover:text-black hover:bg-white hover:border-black transition-all"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}  
