// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyles'; // Importar o GlobalStyle
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterForm';
import TasksPage from './pages/TasksPage';
import UserTasksPage from './pages/UserTasksPage'; // Importar o novo componente
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import IntroPage from './components/Header/Intro';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle /> {/* Aplicar o estilo global */}
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks/:username" element={<TasksPage />} />
            <Route path="/user-tasks" element={<UserTasksPage />} /> {/* Adicionar a nova rota */}
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default App;
