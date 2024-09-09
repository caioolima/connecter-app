// Importa as bibliotecas e módulos necessários
import React from 'react'; // Biblioteca React
import ReactDOM from 'react-dom'; // Biblioteca para renderizar o React no DOM
import App from './App'; // Importa o componente principal da aplicação
import { AuthProvider } from './Context/AuthContext'; // Importa o provedor de autenticação
import { BrowserRouter as Router } from 'react-router-dom'; // Importa o roteador para navegação de páginas

// Renderiza o componente principal da aplicação no elemento com id 'root'
ReactDOM.render(
  <React.StrictMode>
    {/* StrictMode ajuda a identificar problemas potenciais em aplicativos React */}
    <Router>
      {/* O Router fornece o contexto de roteamento para a aplicação */}
      <AuthProvider>
        {/* O AuthProvider fornece o contexto de autenticação para a aplicação */}
        <App />
        {/* O componente App é o componente principal da aplicação */}
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
  // Define o ponto de montagem no DOM onde a aplicação React será renderizada
);
