module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // erreur d'application personnalisée
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'ValidationError':
            // erreur de validation mongoose
            return res.status(400).json({ message: err.message });
        case err.name === 'UnauthorizedError':
            // erreur d'authentification jwt
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}