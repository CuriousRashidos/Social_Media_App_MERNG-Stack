const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const { AdvancedConsoleLogger } = require("typeorm");
const config = require("./config");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;
const resolvers = {
  Query: {
    sayHi: () => `Hello World`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb connected')
    server.listen(
        {
            port: 5000
        }
    ).then(
        res => {console.log(`server running on ${res.url}`)}
    ).catch(error => console.log(error.message))
  }).catch ( error => console.log(error.message))
