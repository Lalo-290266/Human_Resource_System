module.exports = (request, response, next) => {
    return response.status(404).json({ code: 404, message: "URL no encontrada" });
};