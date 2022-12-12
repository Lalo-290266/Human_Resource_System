const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, "debugkey");
        request.user = decoded;
        next();
    } 
    catch (error) {
        return response.status(401).json({ code: 401, message: "Usuario sin autorizacion" });
    }
};