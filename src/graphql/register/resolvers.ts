import * as bcrypt from 'bcryptjs';

import { Users } from "../../entity/Users";
import { ResolverMap } from '../../types/resolverMap';
import { createTokens } from '../../utils/createToken';

export const resolvers: ResolverMap = {
    Query: {
        hello: () => 'hi',
        allUsers: async () => {
            const users = await Users.find({});
            return users;
        },
        getUser: (_: any, { id }: any) => {
            return Users.findOne(id);
        }
    },
    Mutation: {
        register: async (_: any, args: any) => {
            try {
                await Users.create({
                    email: args.email,
                    password: args.password
                }).save();
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
        login: async (_: any, args: any, { SECRET, SECRET2 }) => {
            const user = await Users.findOne({ where: { email: args.email } });
            if(!user) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: "email",
                            message: "No email exists"
                        }
                    ]
                }
            }

            const valid = bcrypt.compareSync(args.password, user.password);

            if(!valid) {
                return {
                    ok: false,
                    errors: [
                        {
                            path: "password",
                            message: "Wrong password"
                        }
                    ]
                }
            }

            const [token, refreshToken] = createTokens(user, SECRET, SECRET2);

            return {
                ok: true,
                token,
                refreshToken
            };

        }
    }
}