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

module.exports = router;