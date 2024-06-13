const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const receitaRoutes = require('./src/routes/receitaRoutes');

const app = express();
const port = 3000;

// Configuração do Mustache Express como engine de templates
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configuração do bodyParser para JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração das rotas
app.use('/usuarios', usuarioRoutes);
app.use('/receitas', receitaRoutes);

// Servindo arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
