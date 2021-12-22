const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.post('/loguearUsuario', async (req, res) => {
    const { email, pass } = req.body;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.membresia_activa, TIPO_USUARIO.nombre FROM USUARIO INNER JOIN TIPO_USUARIO ON USUARIO.ID_TIPO = TIPO_USUARIO.ID  WHERE CORREO =:email AND CLAVE =:pass AND USUARIO.id_estado_usuario = 1";
    //query, campos, aqui se verifica si es un commit
    let result = await BD.Open(sql, [email, pass], false);
    Persons = [];

    result.rows.map(usuario => {
        let usuarioSchema = {
            "id": usuario[0],
            "nombres": usuario[1],
            "apellidos": usuario[2],
            "membresia_activa": usuario[3],
            "tipo_usuario": usuario[4]
        }
        Persons.push(usuarioSchema);
    })
    if (Persons.length > 0) {
        res.status(201).json({
            "response": true, 
            "msg": "¡Bienvenido!",
            "datos":Persons
        });
    }else{
        res.status(201).json({
            "response": false,
            "msg": "Credenciales invalidas"
        });
    }
    
});

//READ
router.get('/getInformacionUsuario', async (req, res) => {
    const { id_usuario } = req.body;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.correo,\
    USUARIO.telefono, USUARIO.genero, USUARIO.fecha_nac, USUARIO.fecha_registro, USUARIO.direccion,\
    USUARIO.membresia_activa, PAIS.nombre, TIPO_USUARIO.nombre\
    FROM USUARIO\
    INNER JOIN PAIS ON USUARIO.ID_PAIS = PAIS.ID \
    INNER JOIN TIPO_USUARIO ON USUARIO.ID_TIPO = TIPO_USUARIO.ID \
    WHERE USUARIO.id = :id_usuario AND USUARIO.id_estado_usuario = 1";
    //query, campos, aqui se verifica si es un commit
    let result = await BD.Open(sql, [id_usuario], false);
    Listado = [];

    result.rows.map(usuario => {
        let usuarioSchema = {
            "id": usuario[0],
            "nombres": usuario[1],
            "apellidos": usuario[2],
            "correo": usuario[3],
            "telefono": usuario[4],
            "genero": usuario[5],
            "fecha_nac": usuario[6],
            "fecha_registro": usuario[7],
            "direccion": usuario[8],
            "membresia_activa": usuario[9],
            "nombre_pais": usuario[10],
            "nombre_tipo_usuario": usuario[11]
        }
        Listado.push(usuarioSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addUsuarioCliente', async (req, res) => {
    const { nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, id_pais } = req.body;

    sql_verificacion_usuario = "SELECT id FROM USUARIO WHERE USUARIO.correo = :correo";
    let r_verificacion_usuario = await BD.Open(sql_verificacion_usuario, [correo], false);
    if (r_verificacion_usuario.rows.length > 0) {
        res.status(400).json({
            "msg": "El correo que ha ingresado ya esta siendo utilizado"
        });
    }else{
        var date_Actual = new Date();
        fecha_actual = date_Actual.toLocaleString();
        
        sql = "INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, \
                direccion, membresia_activa, id_pais, id_tipo, id_estado_usuario) \
                VALUES (\
                    :nombres,\
                    :apellidos,\
                    :clave,\
                    :correo,\
                    :telefono,\
                    :genero,\
                    TO_DATE(:fecha_nac, 'dd/mm/yyyy hh24:mi:ss'),\
                    TO_DATE('" + fecha_actual +"', 'dd/mm/yyyy hh24:mi:ss'),\
                    :direccion,\
                    0,\
                    :id_pais,\
                    (SELECT(ID) FROM TIPO_USUARIO WHERE NOMBRE = 'Cliente'),\
                    (SELECT(ID) FROM ESTADO_USUARIO WHERE NOMBRE = 'Activo')) ";
        await BD.Open(sql, [nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, id_pais], true);
        res.status(200).json({
            "msg": "Bienvenido "+nombres
        });
    }
});

//CREATE
router.post('/addUsuarioAdmEmp', async (req, res) => {
    const { nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, id_pais, id_tipo } = req.body;

    sql_verificacion_usuario = "SELECT COUNT(id) FROM USUARIO WHERE USUARIO.correo = :correo";
    let r_verificacion_usuario = await BD.Open(sql_verificacion_usuario, [correo], false);
    if (r_verificacion_usuario.rows[0][0] > 0) {
        res.status(400).json({
            "msg": "El correo que ha ingresado ya esta siendo utilizado"
        });
    }else{
        var date_Actual = new Date();
        result = date_Actual.toLocaleString();
        
        sql = "INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, \
                direccion, membresia_activa, id_pais, id_tipo, id_estado_usuario) \
                VALUES (\
                    :nombres,\
                    :apellidos,\
                    :clave,\
                    :correo,\
                    :telefono,\
                    :genero,\
                    TO_DATE(:fecha_nac, 'DD/MM/YYYY'),\
                    TO_DATE('" + result +"', 'dd/mm/yyyy hh24:mi:ss'),\
                    :direccion,\
                    0,\
                    :id_pais,\
                    :id_tipo,\
                    (SELECT(ID) FROM ESTADO_USUARIO WHERE NOMBRE = 'Activo')) ";

        await BD.Open(sql, [nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, id_pais, id_tipo], true);

        res.status(200).json({
            "msg": "Ha sido ingresado correctamente"
        })
    }
});

//UPDATE
router.put("/updateUsuario", async (req, res) => {
    const { nombres, apellidos, clave, telefono, genero, fecha_nac, direccion, id_pais, id_usuario } = req.body;
    //Lo unico que no puede modificar seria su membresia y correo
    sql = "UPDATE USUARIO SET nombres=:nombres, apellidos=:apellidos, clave=:clave,\
                telefono=:telefono, genero=:genero, fecha_nac=TO_DATE(:fecha_nac, 'dd/mm/yyyy hh24:mi:ss'), \
                direccion=:direccion,id_pais=:id_pais WHERE id=:id_usuario";

    await BD.Open(sql, [nombres, apellidos, clave, telefono, genero, fecha_nac, direccion, id_pais, id_usuario], true);

    res.status(200).json({
        "msg": "Actualizado Correctamente"
    })

});

//DELETE
router.delete("/deleteUsuario", async (req, res) => {
    const { id_usuario } = req.body;
    sql = "UPDATE USUARIO SET id_estado_usuario = (SELECT (ID) FROM ESTADO_USUARIO WHERE nombre='No Activo') WHERE id=:id_usuario";
    await BD.Open(sql, [id_usuario], true);
    res.json({ "msg": "Usuario Eliminado" })
});

module.exports = router;