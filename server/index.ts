import { ApolloServer, gql } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';

const typeDefs = gql`
    type User {
        name: String
    },
    type Query {
        users: [User]
    }
`;

const users = [
    {
        name: "Joe"
    }
]

const resolvers = {
    Query: {
        users: () => users,
    }
}

async function startApolloServer(typeDefs: any, resolvers: any) {
    const app = express();
    const port = process.env.port || 4000;
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });
    app.use(
        cors({
            origin: "*",
            credentials: true
        })
    );
    app.get('/api/test', (req, res)=> {
        res.send({data: `Connected to the server @ port ${port}`})
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>(resolve => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

