//Dependencies
const morgan = require('morgan');//Para visualizar las peticiones
const express = require('express');//framawork
const app = express();
//Routers
const employee = require('./routes/employee');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors')

app.use(cors);//Control de headers
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use('/user', user);//Filtro de rutas /user
app.use(auth);
app.use('/employee', employee);//Filtro de rutas /employee
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is runnig...');
});
