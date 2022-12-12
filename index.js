const express = require('express');
const app = express();

app.get("/", (response, request, next) => {
    response.status(200).send('Bienvenido!');
});

app.listen(process.env.PORT || 3000, () => {//Server
    console.log('Server is runnig...');
});