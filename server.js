const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./User');

async function startServer() {
    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    mongoose.connect('mongodb://localhost:27017/comp3133_101415874_assignment1', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.listen(4000, () => {
        console.log('🚀 Server running on http://localhost:4000/graphql');
    });
}

startServer();
