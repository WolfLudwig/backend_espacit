module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // inclure toutes les erreurs
        allowUnknown: true, // ignorer les accessoires inconnus
        stripUnknown: true // supprimer les accessoires inconnus
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}