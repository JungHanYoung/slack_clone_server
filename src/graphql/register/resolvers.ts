import { User } from "../../entity/User";

export const resolvers = {
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