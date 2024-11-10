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
    <div className="w-1/2 h-2/3 pano de fundo-desfoque-sm sombra-2xl sombra-cinza-500 borda-4 borda-branca arredondado-md bg-transparente flex flex-col justificar-uniformemente itens-centro p-4">
      <h2 className="texto-branco texto-5xl fonte-negrito borda-b-2 borda-cinza-400 w-80 p-2 texto-centro">
        LOGIN
      </h2>
      <div className="w-full">
        <p className="mb-2 text-white">Seu Usuário</p>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={handleUsuarioChange}
          className="w-full h-auto bg-transparente-nenhum borda-2 borda-branco texto-branco base-texto p-5 mb-5 arredondado foco:bg-branco foco:borda-preto foco:texto-preto"
        />
        <p className="mb-2 texto-white">Sua Senha</p>
        {verSenha ? (
          <input
            type="text"
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Senha"
            className="w-5/6 h-auto bg-transparent outline-none border-2 border-white text-white text-base p-5 mb-5 arredondado foco:bg-branco foco:borda-preta foco:texto-preto"
          />
        ) : (
          <input
            type="password"
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Senha"
            className="w-5/6 h-auto bg-transparent outline-none borda-2 borda-branca texto-branco base-texto p-5 mb-5 arredondado foco:bg-branco foco:borda-preto foco:texto-preto"
          />
        )}
        <button
          className="w-auto arredondado-sm ml-4 p-4 borda-2 borda-branca item"
          onClick={verificarVerSenha}
        >
          VER
        </button>
        <div className="flex justificar-centralizar">
          <button
            className="border-2 fonte-semibold borda-branca p-4 arredondado-cheio w-52 texto-branco hover:texto-preto hover:bg-branco hover:border-black transaction-all"
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};
