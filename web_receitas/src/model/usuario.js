let usuarios = [];
let userId = 1;

function adicionarUsuario(username, senha) {
  const novoUsuario = { id: userId++, username, senha };
  usuarios.push(novoUsuario);
  return novoUsuario;
}

function buscarUsuario(username, senha) {
  return usuarios.find(u => u.username === username && u.senha === senha);
}

module.exports = {
  adicionarUsuario,
  buscarUsuario,
  usuarios // para depuração ou outros usos
};
