import { createGlobalStyle } from 'styled-components';

// Define estilos globais para a aplicação
const GlobalStyle = createGlobalStyle`
  // Importa a fonte 'Raleway' do Google Fonts
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

  // Estilos globais para o elemento <body>
  body {
    font-family: 'Raleway', sans-serif; /* Define a fonte padrão como 'Raleway' */
    color: ${({ theme }) => theme.colors.text}; /* Define a cor do texto com base no tema */
    background-color: ${({ theme }) => theme.colors.background}; /* Define a cor de fundo com base no tema */
    margin: 0; /* Remove as margens padrão do body */
    padding: 0; /* Remove o padding padrão do body */
  }

  // Estilos para elementos de formulário
  input, textarea, button, select, option {
    font-family: 'Raleway', sans-serif; /* Define a fonte padrão como 'Raleway' */
  }

  // Estilos específicos para o elemento <button>
  button {
    background-color: ${({ theme }) => theme.colors.button}; /* Define a cor de fundo do botão com base no tema */
    color: #fff; /* Define a cor do texto do botão como branco */
    border: none; /* Remove a borda padrão do botão */
    border-radius: 4px; /* Adiciona bordas arredondadas ao botão */
    padding: 10px 20px; /* Adiciona espaçamento interno ao botão */
    cursor: pointer; /* Muda o cursor para indicar que é clicável */
    font-family: 'Raleway', sans-serif; /* Define a fonte do botão como 'Raleway' */
  }
`;

export default GlobalStyle;
