// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyles'; // Importar o GlobalStyle
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import UserTasksPage from './pages/UserTasksPage'; // Importar o novo componente
import Header from './components/Header';
import Footer from './components/Footer';
import IntroPage from './components/Intro';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle /> {/* Aplicar o estilo global */}
      <Router>
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
      </Router>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default App;
