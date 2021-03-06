const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getEstadoUsuario', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM ESTADO_USUARIO ORDER BY ESTADO_USUARIO.nombre";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_estado": registro[0],
            "nombre": registro[1]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

module.exports = router;