# Connecter Notes

## Descrição
O Connecter Notes é uma aplicação web de gerenciamento de tarefas, desenvolvida com React.js para o frontend, Node.js e Express para o backend, e MySQL como banco de dados. Permite aos usuários registrar, fazer login e gerenciar suas tarefas.

## Tecnologias Utilizadas
* **Frontend:** React, styled-components
* **Backend:** Node.js, Express
* **Banco de dados:** MySQL
* **Autenticação:** JWT

## Deploy
* **Banco de Dados**: O banco MySQL foi criado e está hospedado na Railway.
* **Backend:** O backend foi deployado na Render.
* **Frontend:** O frontend foi deployado na Vercel.

## Instalação
### Backend
1. Clone o repositório:
```bash
   git clone [https://github.com/caioolima/connecter-app-backend.git](https://github.com/caioolima/connecter-app-backend.git)
```

2. Instale as dependências:
```bash
    cd task-manager
    cd backend-task
    npm install
```

3. Configure o banco de dados:
    
    - Crie um banco de dados MySQL e ajuste as credenciais no arquivo .env.

4. Inicie o servidor:
```bash
    npm start
```

## Frontend

 1. Clone o repositório:
```bash
     git clone [https://github.com/caioolima/connecter-app.git](https://github.com/caioolima/connecter-app.git)
```

2. Instale as dependências:

```bash
    cd task-manager
    cd frontend-task
    npm install
```

3. Configure o endpoint da API:

- Certifique-se que o frontend esteja configurado para se comunicar com o backend em http://localhost:5000.

4. Inicie a aplicação:
```bash
    - npm start
```
## Uso

- **Registro:** Acesse `/register` para criar uma nova conta.
- **Login:** Acesse `/login` para entrar na sua conta.
- **Gerenciamento de tarefas:** Após o login, você poderá criar, visualizar e editar suas tarefas.
- **Acesso para usuários deslogados:** Usuários não autenticados podem visualizar os dados, mas não conseguem editá-los.

## Contribuição

- Sinta-se à vontade para contribuir com o projeto! Abra uma issue para reportar bugs ou sugestões.

## Licença

- Este projeto está licenciado sob a Licença MIT.
