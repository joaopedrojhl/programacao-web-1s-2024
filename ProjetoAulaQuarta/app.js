const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session'); // Importa o express-session
const app = express();
const PORT = 3000;

// Configurar banco de dados
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT)");
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, userId INTEGER)");
});

// Configuração do middleware de sessão
app.use(session({
    secret: 'your-secret-key', // Use uma chave secreta segura
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para verificação de autenticação
function checkAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.redirect('/login');
}

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { user: req.session ? req.session.username : null });
});

// Registro de usuário
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(err) {
        if (err) return res.send('Erro ao registrar');
        res.redirect('/login');
    });
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err || !row) return res.send('Login falhou');
        req.session.userId = row.id;
        req.session.username = row.username;
        res.redirect('/');
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Perfil do usuário
app.get('/profile', checkAuth, (req, res) => {
    db.get('SELECT * FROM users WHERE id = ?', [req.session.userId], (err, row) => {
        if (err) return res.send('Erro ao carregar perfil');
        res.render('profile', { user: row });
    });
});

app.post('/profile', checkAuth, (req, res) => {
    const { username, email } = req.body;
    db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, req.session.userId], (err) => {
        if (err) return res.send('Erro ao atualizar perfil');
        res.redirect('/profile');
    });
});

// Listagem de produtos
app.get('/products', checkAuth, (req, res) => {
    db.all('SELECT * FROM products WHERE userId = ?', [req.session.userId], (err, rows) => {
        if (err) return res.send('Erro ao carregar produtos');
        res.render('products', { products: rows });
    });
});

// Cadastro de produto
app.get('/product/new', checkAuth, (req, res) => {
    res.render('product_form', { product: {} });
});

app.post('/product/new', checkAuth, (req, res) => {
    const { name, price } = req.body;
    db.run('INSERT INTO products (name, price, userId) VALUES (?, ?, ?)', [name, price, req.session.userId], (err) => {
        if (err) return res.send('Erro ao adicionar produto');
        res.redirect('/products');
    });
});

// Edição de produto
app.get('/product/edit/:id', checkAuth, (req, res) => {
    db.get('SELECT * FROM products WHERE id = ? AND userId = ?', [req.params.id, req.session.userId], (err, row) => {
        if (err) return res.send('Erro ao carregar produto');
        res.render('product_form', { product: row });
    });
});

app.post('/product/edit/:id', checkAuth, (req, res) => {
    const { name, price } = req.body;
    db.run('UPDATE products SET name = ?, price = ? WHERE id = ? AND userId = ?', [name, price, req.params.id, req.session.userId], (err) => {
        if (err) return res.send('Erro ao atualizar produto');
        res.redirect('/products');
    });
});

// Exclusão de produto
app.get('/product/delete/:id', checkAuth, (req, res) => {
    db.run('DELETE FROM products WHERE id = ? AND userId = ?', [req.params.id, req.session.userId], (err) => {
        if (err) return res.send('Erro ao excluir produto');
        res.redirect('/products');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
