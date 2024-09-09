// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyles';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterForm';
import TasksPage from './pages/TasksPage';
import UserTasksPage from './pages/UserTasksPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import IntroPage from './components/Header/Intro';
import NotFoundPage from './pages/NotFoundPage'; // Importar a página 404
import styled from 'styled-components';
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks/:username" element={<TasksPage />} />
            <Route path="/user-tasks" element={<PrivateRoute><UserTasksPage /></PrivateRoute>} />
            <Route path="*" element={<NotFoundPage />} /> {/* Rota para página 404 */}
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
