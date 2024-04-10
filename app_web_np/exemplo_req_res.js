const calc = require('./util/calculadora');
const app = express();

app.get('/', function(req, res){
    res.send('Página inicial');
})

app.get('/somar/:a/:b', function(req, res){
    let a = req.params.a;
    let b = req.params.b;
    res.send('calc.somar((a),(b))');
})

app.get('/subtrair/:a/:b', function(req, res){
    res.send('Olá, mundo!');
})

app.get('/multiplicar/:a/:b', function(req, res){
    res.send('Olá, mundo!');
})

app.get('/dividir/:a/:b', function(req, res){
    res.send('Olá, mundo!');
})

const PORT = 8080;
app.listen(PORT, function (){
    console.log('app rodando na porta ' + PORT);
});