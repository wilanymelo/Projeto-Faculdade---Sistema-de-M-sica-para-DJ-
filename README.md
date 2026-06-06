# Sistema de Música para DJ

Projeto desenvolvido para a faculdade de Sistemas para Internet.

## API

Render:
https://sistema-de-musica-para-dj.onrender.com

## Front-end

GitHub Pages:
https://wilanymelo.github.io/Projeto-Faculdade---Sistema-de-M-sica-para-DJ-/

## Endpoints

### POST /register

Cadastro de usuário.

Exemplo:

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

### POST /login

Retorna um token JWT.

### GET /musicas

Rota protegida por JWT.

## Tecnologias

- Node.js
- Express
- JWT
- Render
- GitHub Pages
- Postman
