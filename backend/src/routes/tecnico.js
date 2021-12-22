const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
**********************************/

//DELETE
router.delete("/deleteTecnico/:id_tecnico", async (req, res) => {
    try {
        const { id_tecnico } = req.params;
        sql = "DELETE FROM TECNICO WHERE id = :id_tecnico";
        await BD.Open(sql, [id_tecnico], true);
        res.status(201).json({ 
            "response": true,
            "msg": "El tecnico ha sido eliminado correctamente" 
        });
    } catch (error) {
        res.status(201).json({ 
            "response": false,
            "msg": "El registro que desea eliminar esta siendo utilizado" 
        });
    }
});

module.exports = router;