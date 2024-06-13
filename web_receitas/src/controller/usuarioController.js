const Usuario = require('../models/Usuario');

exports.registrar = (req, res) => {
  const { username, senha } = req.body;
  const novoUsuario = Usuario.adicionarUsuario(username, senha);
  res.status(201).send('Usuário registrado com sucesso');
};

exports.login = (req, res) => {
  const { username, senha } = req.body;
  const usuario = Usuario.buscarUsuario(username, senha);
  if (usuario) {
    res.status(200).send('Usuário logado com sucesso');
  } else {
    res.status(404).send('Usuário não encontrado');
  }
};
