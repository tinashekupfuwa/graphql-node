const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { Mutation } = require("./resolvers/Mutation");
const { db } = require("./db"); //importing db, exported from db.js
const app = express();
const PORT = 4000;

const server = new ApolloServer({
  /*remember the formatting is typeDefs,resolvers:{},context:{} */
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product,
  },
  context: {
    db,
    //context now contains a whole database.
  },
});

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(
      `Server has started running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});
