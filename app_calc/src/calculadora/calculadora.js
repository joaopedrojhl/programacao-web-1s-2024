const { resultado } = require("../controller/calculadoraController");

function calcular(v1, v2, op) {
    switch (op) {

        case '+':
            resultado = v1 + v2;
            break;

        case '-':
            resultado = v1 - v2;
            break;

        case '*':
            resultado = v1 * v2;
            break;
        case '/':
            resultado = v1 / v2;
            break;
    }
    return resultado;
}
function nomeOperador(op) {
    switch (op) {

        case '+':
            resultado = "soma";
            break;

        case '-':
            resultado = "subtração";
            break;

        case '*':
            resultado = "multiplição";
            break;
        case '/':
            resultado = "divisão";
            break;
    }
    return resultado;
    
}
module.exports = {
    calcular
}