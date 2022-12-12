module.exports = (request, response, next) => {
    return response.status(200).json({ code: 200, message: "Bienvenido!" });
};