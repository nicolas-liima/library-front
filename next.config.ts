// next.config.ts

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Desativa o modo estrito do React
  typescript: {
    ignoreBuildErrors: true, // Ignora erros de TypeScript no build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros do ESLint no build
  },
  productionBrowserSourceMaps: false, // Remove source maps em produção para ocultar detalhes internos
  
  // Suprimir erros de console no ambiente de produção
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      console.log = () => {};
      console.error = () => {};
      console.warn = () => {};
    }
    return config;
  },

  // Configuração para redirecionar chamadas de API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:15001/api/:path*', // Ajuste conforme o endereço do backend
      },
    ];
  },

  // Variável de ambiente para mensagem de erro personalizada
  env: {
    NEXT_PUBLIC_CUSTOM_ERROR_MESSAGE: "Ocorreu um erro. Tente novamente mais tarde.",
  },
};

export default nextConfig;
