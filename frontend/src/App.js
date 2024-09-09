// Importa as bibliotecas e componentes necessários
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Importa componentes de roteamento
import { ThemeProvider } from 'styled-components'; // Fornece o tema para os componentes estilizados
import theme from './styles/theme'; // Importa o tema definido
import GlobalStyle from './styles/GlobalStyles'; // Importa os estilos globais
import LoginPage from './pages/LoginPage'; // Importa a página de login
import RegisterPage from './pages/RegisterForm'; // Importa a página de registro
import TasksPage from './pages/TasksPage'; // Importa a página de tarefas
import UserTasksPage from './pages/TaskManager'; // Importa a página de gerenciamento de tarefas do usuário
import Header from './components/Header/Header'; // Importa o componente de cabeçalho
import Footer from './components/Footer/Footer'; // Importa o componente de rodapé
import IntroPage from './components/Header/Intro'; // Importa a página de introdução
import NotFoundPage from './pages/NotFoundPage'; // Importa a página 404 (não encontrado)
import styled from 'styled-components'; // Importa styled-components para estilização
import PrivateRoute from "./PrivateRoute"; // Importa o componente de rota privada

// Componente principal da aplicação
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Fornece o tema para todos os componentes estilizados dentro do ThemeProvider */}
      <GlobalStyle />
      {/* Aplica os estilos globais à aplicação */}
      <AppContainer>
        <Header />
        {/* Adiciona o cabeçalho à aplicação */}
        <MainContent>
          <Routes>
            {/* Define as rotas da aplicação */}
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks/:username" element={<TasksPage />} />
            <Route path="/user-tasks" element={<PrivateRoute><UserTasksPage /></PrivateRoute>} />
            {/* Define a rota protegida por autenticação para a página de tarefas do usuário */}
            <Route path="*" element={<NotFoundPage />} />
            {/* Rota padrão para página 404 */}
          </Routes>
        </MainContent>
        <Footer />
        {/* Adiciona o rodapé à aplicação */}
      </AppContainer>
    </ThemeProvider>
  );
}

// Estiliza o contêiner principal da aplicação
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000; /* Define o fundo como preto */
  min-height: 100vh; /* Garante que o contêiner ocupe toda a altura da tela */
`;

// Estiliza o conteúdo principal da aplicação
const MainContent = styled.main`
  flex: 1; /* Faz com que o conteúdo principal ocupe o espaço restante */
`;

export default App;
