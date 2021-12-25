const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getEstadosPartidoClave', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM ESTADO_PARTIDO";
    
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