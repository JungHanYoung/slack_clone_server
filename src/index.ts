import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'hi'
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 4000 }).then(() => {
    console.log("server listening on port", 4000);
})