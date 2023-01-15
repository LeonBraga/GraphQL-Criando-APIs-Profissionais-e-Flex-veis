const { ApolloServer, gql } = require("apollo-server");

//  Dados gerados em: https://generatedata.com/generator
const perfis = [
  {
    id: 1,
    nome: "comum",
  },
  {
    id: 2,
    nome: "administrador",
  },
];

const usuarios = [
  {
    id: 1,
    nome: "Rahim Payne",
    email: "magna.a@aol.couk",
    idade: 25,
    telefone: "(75)01180-6777",
  },
  {
    id: 2,
    nome: "Adam Salas",
    email: "non.luctus@icloud.org",
    idade: 28,
    telefone: "(60)21226-2724",
  },
  {
    id: 3,
    nome: "Robin Cox",
    email: "malesuada.malesuada@outlook.couk",
    idade: 42,
    telefone: "(68)60252-8433",
  },
  {
    id: 4,
    nome: "Nomlanga Robinson",
    email: "pellentesque@google.com",
    idade: 35,
    telefone: "(11)23203-2162",
  },
  {
    id: 5,
    nome: "Charde Hood",
    email: "urna.nunc.quis@outlook.net",
    idade: 33,
    telefone: "(66)27460-4633",
  },
];

const typeDefs = gql`
  scalar Date

  type Perfil {
    id: Int
    nome: String!
  }

  type Usuario {
    id: Int
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
    usuarios: [Usuario]
    usuario(id: Int): Usuario
    perfis: [Perfil]
    perfil(id: Int): Perfil
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
      const perfil = perfis.filter(perfil => perfil.id === id)
      return perfil ? perfil[0] : null
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
