import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

  body {
    font-family: 'Raleway', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    margin: 0;
    padding: 0;
  }

  button {
    background-color: ${({ theme }) => theme.colors.button};
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-family: 'Raleway', sans-serif;

    &:hover {
      background-color: #0051a1; /* Azul mais escuro para hover */
    }
  }
`;

export default GlobalStyle;
