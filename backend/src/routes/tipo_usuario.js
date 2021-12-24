const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getTiposUsuarios', async (req, res) => {
    const {  } = req.body;
    sql = "SELECT * FROM TIPO_USUARIO ORDER BY TIPO_USUARIO.id";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id": registro[0],
            "nombre": registro[1]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

module.exports = router;