const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

/*********************************
CAMPOS OBLIGATORIOS
id_pais != -1
nombre != ""
fecha_fundacion != ""
**********************************/

//READ
router.get('/getMembresiaUsuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    sql = "SELECT HISTORIAL_MEMBRESIA.id, MEMBRESIA.nombre, TO_CHAR(HISTORIAL_MEMBRESIA.fecha_inicio, 'DD/MM/YYYY'),\
    TO_CHAR(HISTORIAL_MEMBRESIA.fecha_final, 'DD/MM/YYYY')\
    FROM HISTORIAL_MEMBRESIA\
    INNER JOIN USUARIO ON USUARIO.id = HISTORIAL_MEMBRESIA.id_usuario\
    INNER JOIN MEMBRESIA ON MEMBRESIA.id = HISTORIAL_MEMBRESIA.id_membresia\
    WHERE HISTORIAL_MEMBRESIA.id_usuario = :id_usuario\
    ORDER BY HISTORIAL_MEMBRESIA.fecha_inicio DESC";
    
    let result = await BD.Open(sql, [id_usuario], false);
    Listado = [];

    result.rows.map(registro => {
        let LSchema = {
            "id_membresia": registro[0],
            "nombre_membresia": registro[1],
            "fecha_inicio": registro[2],
            "fecha_final": registro[3]
        }
        Listado.push(LSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addMembresia', async (req, res) => {
    const { id_usuario, num_tarjeta } = req.body;

    if (!(num_tarjeta != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        var fecha_actual = new Date();
        fecha_inicial = fecha_actual.toLocaleString();
        var fecha_mes_despues = new Date(fecha_actual.setMonth(fecha_actual.getMonth()+1));
        fecha_final = fecha_mes_despues.toLocaleString();

        sql_insertar_pago = "INSERT INTO HISTORIAL_MEMBRESIA (id_usuario, id_membresia, fecha_inicio, fecha_final, num_tarjeta)\
        VALUES(\
            :id_usuario,\
            1,\
            TO_DATE('" + fecha_inicial +"', 'dd/mm/yyyy hh24:mi:ss'),\
            TO_DATE('" + fecha_final +"', 'dd/mm/yyyy hh24:mi:ss'),\
            :num_tarjeta\
            )";
        await BD.Open(sql_insertar_pago, [id_usuario, num_tarjeta], true);

        sql_actualizar_membresia_usuario = "UPDATE USUARIO SET\
        membresia_activa = 1\
        WHERE id = :id_usuario";
        await BD.Open(sql_actualizar_membresia_usuario, [id_usuario], true);

        res.status(201).json({
            "response":true,
            "msg": "Su membresia ha sido activada, se vencera el "+fecha_final
        });        
    }
});

module.exports = router;