const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { Mutation } = require("./resolvers/Mutation");
const { categories, products, reviews } = require("./db");
const app = express();
const PORT = 4000;

//Scalar types :String,Int,Float,Boolean

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
    /*:context in the (parent,args,context) is used for db storage
      we use context when we do not want to import variables or db in each and every one of our resolvers.
     */
    categories,
    products,
    reviews,
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
