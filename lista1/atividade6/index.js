const express         = require('express');
const mustacheExpress = require('mustache-express');
const app             = express();
const bodyParser = require('body-parser');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    let nome = req.params.nome;
    res.render('index.html', {nome});
});

app.post('/dados', function(req, res){
    let dados = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        data_agendamento: req.body.data_agendamento
    };
    res.render('dados.html', { dados });
});

const PORT = 8080;
app.listen(PORT, function(){
    console.log('app rodando na porta '+ PORT);
});