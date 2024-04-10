let produtos = [];

function criarProduto(id, nome, qtd) {
    let p ={
        id: id,
        nome: nome,
        qtd: qtd
    }    
    return p;
}

function adicionarProduto(p){
    produtos.push(p);
}

function listaProdutos() {
    return produtos;
}

function removerProduto(id) {
    produtos = produtos.filter((p) => {
        return p.id != id
    }); 
}

module.exports = {
    criarProduto,
    adicionarProduto,
    listaProdutos,
    removerProduto
};