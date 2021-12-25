const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getEstadoJugador', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM ESTADO_JUGADOR ORDER BY ESTADO_JUGADOR.nombre";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_estado_jugador": registro[0],
            "nombre": registro[1]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//READ
router.get('/getEstadoJugadorClave', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM ESTADO_JUGADOR ORDER BY ESTADO_JUGADOR.nombre";
    
    let result = await BD.Open(sql, [], false);
    
    var jsonNuevo = "{";
    result.rows.map(registro => {
        jsonNuevo += '"'+registro[0] +'":"'+ registro[1]+'",';
    });
    jsonNuevo = jsonNuevo != "{"? jsonNuevo.slice(0, -1): jsonNuevo;
    jsonNuevo += "}";
    res.status(200).json([JSON.parse(jsonNuevo)]);
});

//UPDATE
router.put("/updateEstadoJugador", async (req, res) => {
    try {
        const { id_jugador, id_estado_jugador } = req.body;
        if (!(id_jugador != -1 && id_estado_jugador != -1)) {
            res.status(201).json({
                "response":false,
                "msg": "No ha ingresado los campos obligatorios"
            });
        }else{
            sql = "UPDATE JUGADOR SET\
            id_estado_jugador = :id_estado_jugador\
            WHERE ID = :id_jugador";
            await BD.Open(sql, [id_estado_jugador, id_jugador], true);
            res.status(201).json({
                "response": true,
                "msg": "Actualizado Correctamente"
            });
        }
    } catch (error) {
        res.status(201).json({
            "response": false,
            "msg": "Ha ocurrido un error al actualizar: "+error
        });
    }
});

module.exports = router;