const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {

    let err = req.query.erro_valor;
    console.log(err);

    res.render('index.html', {err});
})

app.post('/resultado', function (req, res) {
    let v1 = Number(req.body.v1);
    let v2 = Number(req.body.v2);
    let op = req.body.op;
    if (isNaN(v1)) {
        res.redirect('/?erro_valor=true')
    } else {
        res.render('resultado.html', { v1, v2, op })
    }

})

const PORT = 8080;
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT);
});