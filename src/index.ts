import { GraphQLServer } from "graphql-yoga";
import { User } from "./entity/User";
import { createConnection } from "typeorm";

const typeDefs = `
    type Query {
        hello: String
    }

    type Mutation {
        register(email: String!, password: String!): Boolean!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'hi'
    },
    Mutation: {
        register: async (_: any, args: any) => {
            try {
                await User.create({
                    email: args.email,
                    password: args.password
                }).save();
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(() => {
    server.start({ port: 4000 }).then(() => {
        console.log("server listening on port", 4000);
    });
})