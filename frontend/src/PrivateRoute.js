// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth } from "./Context/AuthContext"; // Ajuste o caminho conforme necessário

const PrivateRoute = ({ children }) => {
    const { username } = useAuth(); // Obtém o username do contexto
    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    // Verifica se o usuário está autenticado
    const isAuthentication = !!token;

    // Redireciona para a página inicial se o usuário não estiver autenticado e tentar acessar /user-data
    if (!isAuthentication && window.location.pathname === "/user-tasks") {
        return <Navigate to="/login" replace />;
    }

    // Permite acesso a todas as rotas se o usuário estiver autenticado
    if (isAuthentication) {
        return children;
    }

    // Redireciona para a página de login se o usuário não estiver autenticado e tentar acessar outras rotas
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;