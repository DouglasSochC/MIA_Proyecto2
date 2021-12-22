const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//Imports
const usuarioRoutes = require('./routes/usuario');
const reportesadmRoutes = require('./routes/reportes_adm');
const equipoRoutes = require('./routes/equipo');
const paisRoutes = require('./routes/pais');

//Settings
app.set('port', 3000);

//Middlewares
/*
Nos imprime el tipo de solicitud que se le esta haciendo al servidor
*/
app.use(morgan('dev'));
/*
Le indicamos que toda informacion que entre a la API sera de tipo JSON
*/
app.use(express.json());
/*
Se le indica a la API que no se enviara informacion atraves de la URL
*/
app.use(express.urlencoded({ extended: false }));
/*
Se le indica a la API que URL va a consumirlo
*/
app.use(cors({origin: 'http://localhost:4200'}));
//Routes
app.use(usuarioRoutes);
app.use(reportesadmRoutes);
app.use(equipoRoutes);
app.use(paisRoutes);

//Run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
});