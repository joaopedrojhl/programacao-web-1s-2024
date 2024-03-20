let calculadora = { // objeto
    numneroA: 0, // propriedade
    numeroB: 0,
    somar: function (){
        return this.numneroA + this.numeroB;
    }
};

calculadora.numneroA = 2;
calculadora.numeroB = 3

console.log(calculadora.somar());


const pessoa = {
    nome: "Nome da pessoa",
    cpf: 123456789,
    telefone: 99999999
}

for(const key in pessoa){
    console.log(key + ' - ' + pessoa[key]);
}

let arr = [false, 1, "DOIS", 11, 56, 60];

for(let i = 0; i< arr.length; i++){
    console.log(i + ' - ' + arr[i]);
}

let matriz = [[1, 2], [3, 4]];
