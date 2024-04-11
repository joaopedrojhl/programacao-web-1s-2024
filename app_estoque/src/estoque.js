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
        return p.id != id;
    }); 
}

function editarProduto(id, qtd){
    produtos.filter((p) => {
        if(id == p.id){
            p.qtd = qtd;
        }
    })
}

module.exports = {
    criarProduto,
    adicionarProduto,
    listaProdutos,
    removerProduto,
    editarProduto
};