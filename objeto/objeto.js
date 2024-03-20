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