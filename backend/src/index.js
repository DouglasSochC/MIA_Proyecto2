const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//Imports
const usuarioRoutes = require('./routes/usuario');
const reportesadmRoutes = require('./routes/reportes_adm');
const equipoRoutes = require('./routes/equipo');
const paisRoutes = require('./routes/pais');
const estadoestadioRoutes = require('./routes/estado_estadio');
const estadioRoutes = require('./routes/estadio');
const tipocompetenciaRoutes = require('./routes/tipo_competencia');
const estadotecnicoRoutes = require('./routes/estado_tecnico');
const competenciaRoutes = require('./routes/competencia');
const tecnicoRoutes = require('./routes/tecnico');
const partidoRoutes = require('./routes/partido');
const jugadorRoutes = require('./routes/jugador');
const estadojugadorRoutes = require('./routes/estado_jugador');
const posicionjugadorRoutes = require('./routes/posicion_jugador');
const membresiaRoutes = require('./routes/membresia');
const estadousuarioRoutes = require('./routes/estado_usuario');
const tipousuarioRoutes = require('./routes/tipo_usuario');
const trayectoriajugadorRoutes = require('./routes/trayectoria_jugador');
const trayectoriatecnicoRoutes = require('./routes/trayectoria_tecnico');
const estadopartidoRoutes = require('./routes/estado_partido');
const noticiaRoutes = require('./routes/noticia');
const reportesClientes = require('./routes/reportes_usu');

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
app.use(competenciaRoutes);
app.use(estadioRoutes);
app.use(usuarioRoutes);
app.use(reportesadmRoutes);
app.use(equipoRoutes);
app.use(paisRoutes);
app.use(estadoestadioRoutes);
app.use(tipocompetenciaRoutes);
app.use(estadotecnicoRoutes);
app.use(tecnicoRoutes);
app.use(partidoRoutes);
app.use(jugadorRoutes);
app.use(estadojugadorRoutes);
app.use(posicionjugadorRoutes);
app.use(membresiaRoutes);
app.use(estadousuarioRoutes);
app.use(tipousuarioRoutes);
app.use(trayectoriajugadorRoutes);
app.use(trayectoriatecnicoRoutes);
app.use(estadopartidoRoutes);
app.use(noticiaRoutes);
app.use(reportesClientes);

//Run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
});
