const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getTiposCompetencias', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM TIPO_COMPETENCIA ORDER BY TIPO_COMPETENCIA.nombre";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_tipo_competencia": registro[0],
            "nombre": registro[1]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

module.exports = router;