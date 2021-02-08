const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize(roles = []) {
    // Le paramètre de rôles peut être une chaîne de rôle unique (par exemple, Role.User ou 'User')
    // ou un tableau de rôles (par exemple [Role.Admin, Role.User] ou ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authentifier le jeton JWT et attacher l'utilisateur à l'objet de requête (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // autoriser en fonction du rôle de l'utilisateur
        async (req, res, next) => {
            const account = await db.Account.findById(req.user.id);
            const refreshTokens = await db.RefreshToken.find({ account: account.id });

            if (!account || (roles.length && !roles.includes(account.role))) {
                // le compte n'existe plus ou le rôle n'est pas autorisé
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentification et autorisation réussies
            req.user.role = account.role;
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}