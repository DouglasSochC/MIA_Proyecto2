const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
fecha_partido != ""
id_estadio != -1
id_estado_partido != -1
asistencia != -1
id_equipo_visita != -1
id_equipo_local != -1
resultado != ""
**********************************/

//READ
router.get('/getPartidos', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT PARTIDO.id, TO_CHAR(PARTIDO.fecha, 'DD/MM/YYYY'), ESTADIO.id, ESTADIO.nombre,\
    ESTADO_PARTIDO.id, ESTADO_PARTIDO.nombre, PARTIDO.asistencia, PARTIDO.resultado,\
    PARTIDO.id_equipo_visita, (SELECT nombre FROM EQUIPO WHERE id = PARTIDO.id_equipo_visita),\
    PARTIDO.id_equipo_local, (SELECT nombre FROM EQUIPO WHERE id = PARTIDO.id_equipo_local),\
    PARTIDO.fecha AS fecha_partido\
    FROM PARTIDO\
    INNER JOIN ESTADIO ON ESTADIO.id = PARTIDO.id_estadio\
    INNER JOIN ESTADO_PARTIDO ON ESTADO_PARTIDO.id = PARTIDO.id_estado\
    INNER JOIN EQUIPO ON EQUIPO.id = PARTIDO.id_equipo_visita\
    INNER JOIN EQUIPO ON EQUIPO.id = PARTIDO.id_equipo_local\
    ORDER BY fecha_partido DESC";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_partido": registro[0],
            "fecha_partido": registro[1],
            "id_estadio": registro[2],
            "nombre_estadio": registro[3],
            "id_estado": registro[4],
            "nombre_estado": registro[5],
            "asistencia": registro[6],
            "resultado": registro[7],
            "id_equipo_visita": registro[8],
            "nombre_equipo_visita": registro[9],
            "id_equipo_local": registro[10],
            "nombre_equipo_local": registro[11]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//READ
router.get('/getPartidosenCurso', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT PARTIDO.id, TO_CHAR(PARTIDO.fecha, 'DD/MM/YYYY'), ESTADIO.id, ESTADIO.nombre,\
    ESTADO_PARTIDO.id, ESTADO_PARTIDO.nombre, PARTIDO.asistencia, PARTIDO.resultado,\
    PARTIDO.id_equipo_visita, (SELECT nombre FROM EQUIPO WHERE id = PARTIDO.id_equipo_visita),\
    PARTIDO.id_equipo_local, (SELECT nombre FROM EQUIPO WHERE id = PARTIDO.id_equipo_local)\
    FROM PARTIDO\
    INNER JOIN ESTADIO ON ESTADIO.id = PARTIDO.id_estadio\
    INNER JOIN ESTADO_PARTIDO ON ESTADO_PARTIDO.id = PARTIDO.id_estado\
    INNER JOIN EQUIPO ON EQUIPO.id = PARTIDO.id_equipo_visita\
    INNER JOIN EQUIPO ON EQUIPO.id = PARTIDO.id_equipo_local\
    WHERE UPPER(ESTADO_PARTIDO.nombre) = UPPER('En Curso')";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_partido": registro[0],
            "fecha_partido": registro[1],
            "id_estadio": registro[2],
            "nombre_estadio": registro[3],
            "id_estado": registro[4],
            "nombre_estado": registro[5],
            "asistencia": registro[6],
            "resultado": registro[7],
            "id_equipo_visita": registro[8],
            "nombre_equipo_visita": registro[9],
            "id_equipo_local": registro[10],
            "nombre_equipo_local": registro[11]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addPartido', async (req, res) => {
    const { fecha_partido, id_estadio, id_estado_partido, asistencia, id_equipo_visita, id_equipo_local, resultado } = req.body;
    if (!(fecha_partido != "" && id_estadio != -1 && id_estado_partido != -1 && asistencia != -1 && id_equipo_visita != -1 && id_equipo_local != -1 && resultado != "")) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT id FROM PARTIDO WHERE PARTIDO.fecha = TO_DATE(:fecha_partido, 'dd/mm/yyyy') AND PARTIDO.id_estadio = :id_estadio";
        let r_existencia = await BD.Open(sql_existencia, [fecha_partido, id_estadio], false);
        if (r_existencia.rows.length > 0) {
            res.status(201).json({
                "response":false,
                "msg": "El partido ya ha sido ingresado debido a su fecha y el lugar del evento"
            });
        }else if(id_equipo_local == id_equipo_visita){
            res.status(201).json({
                "response":false,
                "msg": "No puede haber un partido con un solo equipo"
            });
        }else{
            sql = "INSERT INTO PARTIDO(fecha, id_estadio, id_estado, asistencia, id_equipo_visita, id_equipo_local, resultado)\
            VALUES (\
                TO_DATE(:fecha_partido, 'dd/mm/yyyy'),\
                :id_estadio,\
                :id_estado_partido,\
                :asistencia,\
                :id_equipo_visita,\
                :id_equipo_local,\
                :resultado\
            )";
            await BD.Open(sql, [fecha_partido, id_estadio, id_estado_partido, asistencia, id_equipo_visita, id_equipo_local, resultado], true);
            res.status(201).json({
                "response":true,
                "msg": "Partido ingresado correctamente"
            });
        }
    }
});

//UPDATE
router.put("/updatePartido", async (req, res) => {
    try {
        const { id_partido, fecha_partido, id_estadio, id_estado_partido, asistencia, id_equipo_visita, id_equipo_local, resultado } = req.body;
        if (!(fecha_partido != "" && id_estadio != -1 && id_estado_partido != -1 && asistencia != -1 && id_equipo_visita != -1 && id_equipo_local != -1 && resultado != "")) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else if(id_equipo_local == id_equipo_visita){
            res.status(201).json({
                "response":false,
                "msg": "No puede haber un partido con un solo equipo"
            });
        }else{
            sql = "UPDATE PARTIDO SET\
            fecha = TO_DATE(:fecha_partido, 'dd/mm/yyyy'),\
            id_estadio = :id_estadio,\
            id_estado = :id_estado_partido,\
            asistencia = :asistencia,\
            id_equipo_visita = :id_equipo_visita,\
            id_equipo_local = :id_equipo_local,\
            resultado = :resultado\
            WHERE id = :id_partido";
            await BD.Open(sql, [fecha_partido, id_estadio, id_estado_partido, asistencia, id_equipo_visita, id_equipo_local, resultado, id_partido], true);
            res.status(201).json({
                "response": true,
                "msg": "Actualizado Correctamente"
            });
        }
    } catch (error) {
        res.status(201).json({
            "response": false,
            "msg": "Ha ocurrido un error al actualizar"
        });
    }
});

//DELETE
router.delete("/deletePartido/:id_partido", async (req, res) => {
    try {
        const { id_partido } = req.params;
        sql = "DELETE FROM PARTIDO WHERE id = :id_partido";
        await BD.Open(sql, [id_partido], true);
        res.status(201).json({ 
            "response": true,
            "msg": "El partido ha sido eliminado correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El registro que desea eliminar esta siendo utilizado" 
        });
    }
});

//UPDATE - Este actualiza el estado de un partido
router.put("/updateEstadoPartido", async (req, res) => {
    try {
        const { id_partido, id_estado } = req.body;
        if (!(id_partido != -1 && id_estado != -1)) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE PARTIDO SET ID_ESTADO = :id_estado\
            WHERE ID = :id_partido";

            await BD.Open(sql, [id_estado, id_partido], true);

            res.status(201).json({
                "response": true,
                "msg": "Actualizado Correctamente"
            });
        }
    } catch (error) {
        res.status(201).json({
            "response": false,
            "msg": "Ha ocurrido un error al actualizar"
        });
    }
});

//READ
router.get('/getPartidopsEstado/:id_estado', async (req, res) => {
    const { id_estado } = req.params;
    sql = "SELECT PARTIDO.id, TO_CHAR(PARTIDO.fecha, 'DD/MM/YYYY'), ESTADIO.id, ESTADIO.nombre,\
    ESTADO_PARTIDO.id, ESTADO_PARTIDO.nombre, PARTIDO.asistencia, PARTIDO.resultado,\
    PARTIDO.id_equipo_visita, (SELECT nombre FROM EQUIPO WHERE id = PARTIDO.id_equipo_visita),\
    PARTIDO.id_equipo_local, (SELECT nombre FROM EQUIPO WHERE id = PARTIDO.id_equipo_local)\
    FROM PARTIDO\
    INNER JOIN ESTADIO ON ESTADIO.id = PARTIDO.id_estadio\
    INNER JOIN ESTADO_PARTIDO ON ESTADO_PARTIDO.id = PARTIDO.id_estado\
    INNER JOIN EQUIPO ON EQUIPO.id = PARTIDO.id_equipo_visita\
    INNER JOIN EQUIPO ON EQUIPO.id = PARTIDO.id_equipo_local\
    WHERE PARTIDO.ID_ESTADO = :id_estado";
    
    let result = await BD.Open(sql, [id_estado], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_partido": registro[0],
            "fecha_partido": registro[1],
            "id_estadio": registro[2],
            "nombre_estadio": registro[3],
            "id_estado": registro[4],
            "nombre_estado": registro[5],
            "asistencia": registro[6],
            "resultado": registro[7],
            "id_equipo_visita": registro[8],
            "nombre_equipo_visita": registro[9],
            "id_equipo_local": registro[10],
            "nombre_equipo_local": registro[11]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addIncidenciaPartido', async (req, res) => {
    const { descripcion, minuto, equipo_incidencia, jugador, id_partido } = req.body;
    if (!(descripcion != "" && minuto != "" && equipo_incidencia != "" && jugador != "" && id_partido != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{        
        sql = "INSERT INTO INCIDENCIAS_PARTIDO(descripcion, minuto, equipo_incidencia, jugador, id_partido)\
        VALUES (\
            :descripcion,\
            :minuto,\
            :equipo_incidencia,\
            :jugador,\
            :id_partido\
        )";
        await BD.Open(sql, [descripcion, minuto, equipo_incidencia, jugador, id_partido], true);
        res.status(201).json({
            "response":true,
            "msg": "Incidencia ingresada correctamente"
        });        
    }
});

module.exports = router;