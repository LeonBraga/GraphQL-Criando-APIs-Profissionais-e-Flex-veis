const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Int
    precoComDesconto: Float
  }

  #Pontos de entrada
  type Query {
    ola: String!
    hora: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
  }
`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
    salario(usuario) {
      return usuario.salario_real;
    },
  },

  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco - produto.preco * (produto.desconto / 100);
      } else return produto.preco;
    },
  },

  Query: {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
