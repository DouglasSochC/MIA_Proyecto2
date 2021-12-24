const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getJugadoresMinimo', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT JUGADOR.ID, JUGADOR.NOMBRES, PAIS.NOMBRE FROM JUGADOR\
    INNER JOIN PAIS ON PAIS.ID = JUGADOR.ID_NACIONALIDAD ORDER BY JUGADOR.NOMBRES";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_jugador": registro[0],
            "nombres": registro[1],
            "nombre_pais": registro[2]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//READ
router.get('/getTrayectoriaJugador/:id_jugador', async (req, res) => {
    const { id_jugador } = req.params;
    sql = "SELECT JUGADOR.ID, JUGADOR.NOMBRES, EQUIPO.ID, EQUIPO.NOMBRE,\
    TO_CHAR(TRAYECTORIA_JUGADOR.FECHA_INICIAL, 'DD/MM/YYYY'),\
    TO_CHAR(TRAYECTORIA_JUGADOR.FECHA_FINAL, 'DD/MM/YYYY')\
    FROM TRAYECTORIA_JUGADOR\
    INNER JOIN JUGADOR ON JUGADOR.ID = TRAYECTORIA_JUGADOR.ID_JUGADOR\
    INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_JUGADOR.ID_EQUIPO\
    WHERE JUGADOR.ID = :id_jugador ORDER BY FECHA_INICIAL ASC";
    
    let result = await BD.Open(sql, [id_jugador], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_jugador": registro[0],
            "nombre_jugador": registro[1],
            "id_equipo": registro[2],
            "nombre_equipo": registro[3],
            "fecha_inicial": registro[4],
            "fecha_final": registro[5]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//INTERT
router.post('/addTrayectoria', async (req, res) => {
    const { id_jugador, id_equipo_nuevo, fecha_transferencia } = req.body;
    
    if (!(id_jugador != -1 && id_equipo_nuevo != -1 && fecha_transferencia != "")) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT ID_EQUIPO, TRAYECTORIA_JUGADOR.ID FROM TRAYECTORIA_JUGADOR WHERE\
        TRAYECTORIA_JUGADOR.ID_JUGADOR = :id_jugador AND TRAYECTORIA_JUGADOR.FECHA_FINAL IS NULL\
        ORDER BY TRAYECTORIA_JUGADOR.FECHA_INICIAL";
        let r_existencia = await BD.Open(sql_existencia, [id_jugador], false);
        if (r_existencia.rows.length == 0) {
            res.status(201).json({
                "response":false,
                "msg": "El jugador actualmente no milita en algun equipo, por lo tanto no puede realizar la transferencia"
            });
        }else{
            
            if (r_existencia.rows[0][0] == id_equipo_nuevo) {
                res.status(201).json({
                    "response":false,
                    "msg": "No se puede realizar una transferencia al mismo equipo"
                }); 
            }else{
                var id_registro = r_existencia.rows[0][1];
                sql_actualizacion = "UPDATE TRAYECTORIA_JUGADOR SET\
                FECHA_FINAL = TO_DATE(:fecha_transferencia, 'dd/mm/yyyy')\
                WHERE ID = :id_registro"
                await BD.Open(sql_actualizacion, [fecha_transferencia, id_registro], true);

                sql_insertar = "INSERT INTO TRAYECTORIA_JUGADOR (id_jugador, id_equipo, fecha_inicial)\
                VALUES(\
                    :id_jugador,\
                    :id_equipo,\
                    TO_DATE(:fecha_transferencia, 'dd/mm/yyyy')\
                    )"
                await BD.Open(sql_insertar, [id_jugador, id_equipo_nuevo, fecha_transferencia], true);
                res.status(201).json({
                    "response":true,
                    "msg": "Transferencia realizada correctamente"
                });
            }
        }
    }
});

module.exports = router;