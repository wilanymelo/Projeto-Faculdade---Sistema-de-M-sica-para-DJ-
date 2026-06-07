const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const users = [];

// Cadastro
app.post('/register', (req, res) => {

    const { email, password } = req.body;

    users.push({
        email,
        password
    });

    res.status(201).send('Usuário cadastrado');

});

// Login
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).send('Credenciais inválidas');
    }

    const token = jwt.sign(
        { email },
        'segredoJWT',
        { expiresIn: '1h' }
    );

    res.json({ token });

});

// Middleware JWT
function autenticarJWT(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).send('Token não fornecido');
    }

    try {

        const dados = jwt.verify(token, 'segredoJWT');

        req.user = dados;

        next();

    } catch {

        return res.status(403).send('Token inválido');

    }

}

// Rota protegida
app.get('/musicas', autenticarJWT, (req, res) => {

    res.json([
        {
            id: 1,
            titulo: 'Música A',
            artista: 'DJ A'
        },
        {
            id: 2,
            titulo: 'Música B',
            artista: 'DJ B'
        }
    ]);

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});