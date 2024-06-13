let receitas = [];
let receitaId = 1;

function adicionarReceita(titulo, ingredientes, instrucoes, userId) {
  const novaReceita = { id: receitaId++, titulo, ingredientes, instrucoes, userId };
  receitas.push(novaReceita);
  return novaReceita;
}

function obterReceitas() {
  return receitas;
}

module.exports = {
  adicionarReceita,
  obterReceitas,
  receitas // para depuração ou outros usos
};
