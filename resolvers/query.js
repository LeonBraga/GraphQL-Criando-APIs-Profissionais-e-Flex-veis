const { usuarios, perfis } = require("../data/db");

module.exports = {
  ola() {
    return "teste";
  },

  hora() {
    return new Date();
  },

  usuarioLogado() {
    return {
      id: 1,
      nome: "Nome teste",
      email: "teste@gmail.com",
      idade: 22,
      salario_real: 1234.45,
      vip: true,
    };
  },

  produtoEmDestaque() {
    return {
      nome: "Produto teste",
      preco: 685.9,
      desconto: 20,
    };
  },

  numerosMegaSena() {
    const crescente = (a, b) => {
      return a - b;
    };
    return Array(6)
      .fill(0)
      .map((numero) => parseInt(Math.random() * 10 + 1))
      .sort(crescente);
  },

  usuarios() {
    return usuarios;
  },

  usuario(_, { id }) {
    const selecionados = usuarios.filter((usuario) => usuario.id === id);
    return selecionados ? selecionados[0] : null;
  },

  perfis() {
    return perfis;
  },

  perfil(_, { id }) {
    const perfil = perfis.filter((perfil) => perfil.id === id);
    return perfil ? perfil[0] : null;
  },
};
