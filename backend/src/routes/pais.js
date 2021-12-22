const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getPaises', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM PAIS ORDER BY PAIS.nombre";
    //query, campos, aqui se verifica si es un commit
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_pais": registro[0],
            "nombre": registro[1]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

module.exports = router;