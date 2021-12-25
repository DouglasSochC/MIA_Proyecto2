const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getTecnicoMinimo', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT TECNICO.ID, TECNICO.NOMBRES, PAIS.NOMBRE FROM TECNICO\
    INNER JOIN PAIS ON PAIS.ID = TECNICO.ID_NACIONALIDAD ORDER BY TECNICO.NOMBRES";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_tecnico": registro[0],
            "nombres": registro[1],
            "nombre_pais": registro[2]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//READ
router.get('/getTrayectoriaTecnico/:id_tecnico', async (req, res) => {
    const { id_tecnico } = req.params;
    sql = "SELECT TECNICO.ID, TECNICO.NOMBRES, EQUIPO.ID, EQUIPO.NOMBRE, PAIS.NOMBRE,\
    TO_CHAR(TRAYECTORIA_TECNICO.FECHA_INICIAL, 'DD/MM/YYYY'),\
    TO_CHAR(TRAYECTORIA_TECNICO.FECHA_FINAL, 'DD/MM/YYYY')\
    FROM TRAYECTORIA_TECNICO\
    INNER JOIN TECNICO ON TECNICO.ID = TRAYECTORIA_TECNICO.ID_TECNICO\
    INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_TECNICO.ID_EQUIPO\
    INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
    WHERE TECNICO.ID = :id_tecnico ORDER BY FECHA_INICIAL ASC";
    
    let result = await BD.Open(sql, [id_tecnico], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_tecnico": registro[0],
            "nombre_tecnico": registro[1],
            "id_equipo": registro[2],
            "nombre_equipo": registro[3],
            "nombre_pais_equipo": registro[4],
            "fecha_inicial": registro[5],
            "fecha_final": registro[6]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//INSERT
router.post('/addTrayectoriaTecnico', async (req, res) => {
    const { id_tecnico, id_equipo_nuevo, fecha_transferencia } = req.body;
    
    if (!(id_tecnico != -1 && id_equipo_nuevo != -1 && fecha_transferencia != "")) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_existencia = "SELECT ID_EQUIPO, TRAYECTORIA_TECNICO.ID FROM TRAYECTORIA_TECNICO WHERE\
        TRAYECTORIA_TECNICO.ID_TECNICO = :id_tecnico AND TRAYECTORIA_TECNICO.FECHA_FINAL IS NULL\
        ORDER BY TRAYECTORIA_TECNICO.FECHA_INICIAL";
        let r_existencia = await BD.Open(sql_existencia, [id_tecnico], false);
        if (r_existencia.rows.length == 0) {
            res.status(201).json({
                "response":false,
                "msg": "El entrenador actualmente no milita en algun equipo, por lo tanto no puede realizar la transferencia"
            });
        }else{
            
            if (r_existencia.rows[0][0] == id_equipo_nuevo) {
                res.status(201).json({
                    "response":false,
                    "msg": "No se puede realizar una transferencia al mismo equipo"
                }); 
            }else{
                var id_registro = r_existencia.rows[0][1];
                sql_actualizacion = "UPDATE TRAYECTORIA_TECNICO SET\
                FECHA_FINAL = TO_DATE(:fecha_transferencia, 'dd/mm/yyyy')\
                WHERE ID = :id_registro"
                await BD.Open(sql_actualizacion, [fecha_transferencia, id_registro], true);

                sql_insertar = "INSERT INTO TRAYECTORIA_TECNICO (id_tecnico, id_equipo, fecha_inicial)\
                VALUES(\
                    :id_tecnico,\
                    :id_equipo,\
                    TO_DATE(:fecha_transferencia, 'dd/mm/yyyy')\
                    )"
                await BD.Open(sql_insertar, [id_tecnico, id_equipo_nuevo, fecha_transferencia], true);
                res.status(201).json({
                    "response":true,
                    "msg": "Transferencia realizada correctamente"
                });
            }
        }
    }
});

module.exports = router;