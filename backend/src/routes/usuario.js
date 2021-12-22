const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');
const nodemailer = require("nodemailer");

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

//SEND EMAIL
router.post('/addUsuarioCliente', async (req, res) => {
    const { nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, id_pais } = req.body;

    if (!(nombres != "" && apellidos != "" && clave != "" && correo != "" && genero != "" && fecha_nac != "" && id_pais != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_verificacion_usuario = "SELECT id FROM USUARIO WHERE USUARIO.correo = :correo";
        let r_verificacion_usuario = await BD.Open(sql_verificacion_usuario, [correo], false);
        if (r_verificacion_usuario.rows.length > 0) {
            res.status(201).json({
                "response": false,
                "msg": "El correo que ha ingresado ya esta siendo utilizado"
            });
        }else{
            var cuerpoUsuario = {
                "nombres":nombres,
                "apellidos":apellidos,
                "clave":clave,
                "correo": correo,
                "telefono":telefono,
                "genero":genero,
                "fecha_nac":fecha_nac,
                "direccion":direccion,
                "id_pais":id_pais
            }
            var convertirJSON = setBase64(cuerpoUsuario);
            console.log(convertirJSON);
            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'soccerstatistics2021@gmail.com',
                    pass: 'byrfnhgzntmetssn',
                },
            });
            
            var mailOptions = {
                from: '"Soccer Statistics ⚽" <soccerstatistics2021@gmail.com>', 
                to: correo, 
                subject: "Recuperacion de Contraseña", 
                html: `¡Hola!<br/>
                Nos hemos percatado que quieres recuperar tu contraseña.
                Por favor has click en el siguiente link, o pegalo dentro de tu navegador prefererido para completar el proceso <a href="http://localhost:3000/confirmarCuenta/`+convertirJSON+`">Confirmar mi cuenta</a>`, // html body
            }
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(201).json({
                        "response": false,
                        "msg": error.message
                    });
                }else{
                    res.status(201).json({
                        "response": true,
                        "msg": "Por favor, confirme su usuario en el correo electronico que usted a proporcionado"
                    });
                }
            });        
        }
    }    
});

//CONFIRM EMAIL
router.get('/confirmarCuenta/:data_user', async (req, res) => {
    const { data_user } = req.params;
    var datos_JSON = getJSONfromB64(data_user);
    var nombres = datos_JSON['nombres'];
    var apellidos = datos_JSON['apellidos'];
    var clave = datos_JSON['clave'];
    var correo = datos_JSON['correo'];
    var telefono = datos_JSON['telefono'];
    var genero = datos_JSON['genero'];
    var fecha_nac = datos_JSON['fecha_nac'];
    var direccion = datos_JSON['direccion'];
    var id_pais = datos_JSON['id_pais'];

    sql_verificacion_usuario = "SELECT id FROM USUARIO WHERE USUARIO.correo = :correo";
    let r_verificacion_usuario = await BD.Open(sql_verificacion_usuario, [correo], false);
    if (r_verificacion_usuario.rows.length > 0) {
        res.redirect('http://localhost:4200/login');
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
        res.redirect('http://localhost:4200/login');
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

/*INI - UTILS*/

function setBase64(json) {
    return Buffer.from(JSON.stringify(json)).toString('base64');    
}

function getJSONfromB64(base64) {
    return JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));
}

/*FIN - UTILS*/
module.exports = router;