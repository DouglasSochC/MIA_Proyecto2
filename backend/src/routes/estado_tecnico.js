const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getEstadoTecnico', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM ESTADO_TECNICO ORDER BY ESTADO_TECNICO.nombre";
    
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

//READ
router.get('/getEstadoTecnicoClave', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM ESTADO_TECNICO ORDER BY ESTADO_TECNICO.nombre";
    
    let result = await BD.Open(sql, [], false);
    
    var jsonNuevo = "{";
    result.rows.map(registro => {
        jsonNuevo += '"'+registro[0] +'":"'+ registro[1]+'",';
    })
    jsonNuevo = jsonNuevo != "{"? jsonNuevo.slice(0, -1): jsonNuevo;
    jsonNuevo += "}";
    res.status(200).json([JSON.parse(jsonNuevo)]);
});

module.exports = router;