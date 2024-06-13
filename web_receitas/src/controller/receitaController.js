const Receita = require('../models/Receita');

exports.criarReceita = (req, res) => {
  const { titulo, ingredientes, instrucoes, userId } = req.body;
  const novaReceita = Receita.adicionarReceita(titulo, ingredientes, instrucoes, userId);
  res.status(201).send('Receita criada com sucesso');
};

exports.obterReceitas = (req, res) => {
  const receitas = Receita.obterReceitas();
  res.render('receitas', { receitas });
};
