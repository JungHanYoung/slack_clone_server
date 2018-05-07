import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

export const createTokens = (user: any, secret: string, secret2: string) => {
    const createToken = jwt.sign(
        {
            user: _.pick(user, ["id", "email"]),
        },
        secret,
        {
            expiresIn: '1h'
        }
    );

    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, 'id')
        },
        secret2,
        {
            expiresIn: '7d'
        }
    )

    return [createToken, createRefreshToken];
}