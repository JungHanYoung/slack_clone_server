import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";

import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { importSchema } from "graphql-import";
import { GraphQLSchema } from "graphql";
import * as fs from 'fs';
import * as path from 'path';

const SECRET = 'jhylove321';
const SECRET2 = 'jhybrave123';

const schemas: GraphQLSchema[] = [];
const folders = fs.readdirSync(path.join(__dirname, './graphql'));
folders.forEach(folder => {
    const { resolvers } = require(`./graphql/${folder}/resolvers`);
    const typeDefs = importSchema(path.join(__dirname, `./graphql/${folder}/schema.graphql`));
    schemas.push(
        makeExecutableSchema({ typeDefs, resolvers })
    );
});

const server = new GraphQLServer({ schema: mergeSchemas({ schemas }), context: { SECRET, SECRET2 } });

createConnection().then(() => {
    server.start({ port: 4000 }).then(() => {
        console.log("server listening on port", 4000);
    });
})