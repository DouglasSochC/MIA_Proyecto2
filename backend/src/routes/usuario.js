const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');
const nodemailer = require("nodemailer");

//READ
router.post('/loguearUsuario', async (req, res) => {
    const { email, pass } = req.body;

    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.membresia_activa, TIPO_USUARIO.nombre FROM USUARIO INNER JOIN TIPO_USUARIO ON USUARIO.ID_TIPO = TIPO_USUARIO.ID  WHERE CORREO =:email AND CLAVE =:pass AND USUARIO.id_estado_usuario = 1";
    
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
    });

    if (Persons.length > 0) {  
        var today = new Date();
        var anio = today.getFullYear();
        var mes = today.getMonth()+1;
        var dia = today.getDate();
        var fecha_actual =dia+"/"+mes+"/"+anio;
        id_usuario = Persons[0]['id'];
        membresia_activa = Persons[0]['membresia_activa'];
        sql_verificar_membresia = "SELECT COUNT(id) FROM HISTORIAL_MEMBRESIA\
        WHERE FECHA_FINAL >= TO_DATE(:fecha_actual, 'DD/MM/YYYY') AND HISTORIAL_MEMBRESIA.ID_USUARIO = :id_usuario";
        let result_verificar = await BD.Open(sql_verificar_membresia, [fecha_actual, id_usuario], false);
        Cantidad = [];

        result_verificar.rows.map(registro => {
            let cantidadSchema = {
                "cantidad": registro[0]
            }
            Cantidad.push(cantidadSchema);
        });
        
        if (Cantidad.length > 0 && Cantidad[0]["cantidad"] <= 0 && membresia_activa == 1) {
            sql_actualizar_membresia = "UPDATE USUARIO SET membresia_activa = 0 WHERE id = :id_usuario";
            await BD.Open(sql_actualizar_membresia, [id_usuario], true);
            Persons[0]['id_membresia'] = 0;
        }

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
router.get('/getInformacionUsuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    sql = "SELECT USUARIO.nombres, USUARIO.apellidos, USUARIO.clave, USUARIO.telefono,\
    USUARIO.genero, TO_CHAR(USUARIO.fecha_nac, 'DD/MM/YYYY'), USUARIO.direccion, USUARIO.link_fotografia, PAIS.id\
    FROM USUARIO\
    INNER JOIN PAIS ON USUARIO.ID_PAIS = PAIS.ID \
    INNER JOIN TIPO_USUARIO ON USUARIO.ID_TIPO = TIPO_USUARIO.ID \
    WHERE USUARIO.id = :id_usuario AND USUARIO.id_estado_usuario = 1";
    
    let result = await BD.Open(sql, [id_usuario], false);
    Listado = [];

    result.rows.map(usuario => {
        let usuarioSchema = {
            "nombres": usuario[0],
            "apellidos": usuario[1],
            "clave": usuario[2],
            "telefono": usuario[3],
            "genero": usuario[4],
            "fecha_nac": usuario[5],
            "direccion": usuario[6],
            "link_fotografia": usuario[7],
            "id_pais": usuario[8]
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
                subject: "Confirmacion de Cuenta", 
                html: `¡Hola!<br/>
                ¡Bienvenido a la familia Soccer Statistics!
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
                    TO_DATE(:fecha_nac, 'dd/mm/yyyy'),\
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

//SEND EMAIL
router.post('/recuperarCuenta', async (req, res) => {
    const { correo } = req.body;

    if (!(correo != "")) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql_verificacion_usuario = "SELECT id FROM USUARIO WHERE USUARIO.correo = :correo";
        let r_verificacion_usuario = await BD.Open(sql_verificacion_usuario, [correo], false);
        if (r_verificacion_usuario.rows.length <= 0) {
            res.status(201).json({
                "response": false,
                "msg": "El correo que ha ingresado no existe"
            });
        }else{
            let id_token = tokenTemporal();
            sql_insertar_token = "INSERT INTO TOKEN_TEMPORAL(ID, FECHA_GENERACION)\
            VALUES(:id_token,CURRENT_TIMESTAMP)";
            await BD.Open(sql_insertar_token, [id_token], true);
            var cuerpoRecuperacion = {
                "tocken":id_token,
                "correo":correo
            }
            var convertirJSON = setBase64(cuerpoRecuperacion);
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
                subject: "Recuperacion de Cuenta", 
                html: `¡Hola!<br/>
                Nos hemos percatado que has olvidado tu contraseña, por lo tanto se te ha generado la siguiente <b>`+id_token+`</b><br/>
                Tienes 2 minutos para confirmar el cambio de contraseña.<br/>
                Por favor has click en el siguiente link, o pegalo dentro de tu navegador prefererido para completar el proceso <a href="http://localhost:3000/actualizarContraseniaCuenta/`+convertirJSON+`">Modificar contraseña</a>`, // html body
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
                        "msg": "Por favor, verifique el correo electronico que usted a proporcionado"
                    });
                }
            });     
        }
    }    
});

//RECUPERAR CUENTA
router.get('/actualizarContraseniaCuenta/:data_user', async (req, res) => {
    const { data_user } = req.params;
    var datos_JSON = getJSONfromB64(data_user);
    var token = datos_JSON['tocken'];
    var correo = datos_JSON['correo'];
    var date_Actual = new Date();
    fecha_actual = date_Actual.toLocaleString();
    sql = "SELECT COUNT(FECHA) AS CANTIDAD FROM (SELECT (CURRENT_TIMESTAMP - FECHA_GENERACION) AS FECHA FROM TOKEN_TEMPORAL WHERE TOKEN_TEMPORAL.ID=:token)\
        WHERE FECHA <= '+00 00:02:00'";
    let result = await BD.Open(sql, [token], false);
    var cantidad = 0;
    result.rows.map(registro => {
        cantidad = registro[0]
    });
    if (cantidad == 0) {
        res.redirect('http://localhost:4200/vencimientotoken');
    }else{
        sql_actualizar = "UPDATE USUARIO SET CLAVE = :token WHERE CORREO = :correo"
        await BD.Open(sql_actualizar, [token, correo], true);
        res.redirect('http://localhost:4200/login');
    }    
});

//CONFIRM EMAIL ADM_EMP
router.get('/confirmarCuentaAE/:data_user', async (req, res) => {
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
    var link_fotografia = datos_JSON['link_fotografia'];
    var id_pais = datos_JSON['id_pais'];
    var id_tipo_usuario = datos_JSON['id_tipo_usuario'];
    var id_estado_usuario = datos_JSON['id_estado_usuario'];

    sql_verificacion_usuario = "SELECT id FROM USUARIO WHERE USUARIO.correo = :correo";
    let r_verificacion_usuario = await BD.Open(sql_verificacion_usuario, [correo], false);
    if (r_verificacion_usuario.rows.length > 0) {
        res.redirect('http://localhost:4200/login');
    }else{
        var date_Actual = new Date();
        fecha_actual = date_Actual.toLocaleString();
        sql = "INSERT INTO USUARIO(nombres, apellidos, clave, correo, telefono, genero, fecha_nac, fecha_registro, \
                direccion, membresia_activa, link_fotografia, id_pais, id_tipo, id_estado_usuario) \
                VALUES (\
                    :nombres,\
                    :apellidos,\
                    :clave,\
                    :correo,\
                    :telefono,\
                    :genero,\
                    TO_DATE(:fecha_nac, 'dd/mm/yyyy'),\
                    TO_DATE('" + fecha_actual +"', 'dd/mm/yyyy hh24:mi:ss'),\
                    :direccion,\
                    0,\
                    :link_fotografia,\
                    :id_pais,\
                    :id_tipo_usuario,\
                    :id_estado_usuario)";
        await BD.Open(sql, [nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, link_fotografia, id_pais, id_tipo_usuario, id_estado_usuario], true);
        res.redirect('http://localhost:4200/login');
    }
});

//CREATE
router.post('/addUsuarioAdmEmp', async (req, res) => {
    const { nombres, apellidos, clave, correo, telefono, genero, fecha_nac, direccion, link_fotografia, id_pais, id_tipo_usuario, id_estado_usuario } = req.body;

    if (!(nombres != "" && apellidos != "" && clave != "" && correo != "" && telefono != -1 && genero != "" && fecha_nac != "" && id_pais != -1 && id_estado_usuario != -1 && id_tipo_usuario != -1)) {
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
                "link_fotografia":link_fotografia,
                "id_pais":id_pais,
                "id_tipo_usuario":id_tipo_usuario,
                "id_estado_usuario":id_estado_usuario
            }
            var convertirJSON = setBase64(cuerpoUsuario);
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
                subject: "Validacion de Correo", 
                html: `¡Hola!<br/>
                Te hemos asignado la siguiente clave para que puedas ingresar al sistema: `+clave+` <br/>
                Por favor has click en el siguiente link, o pegalo dentro de tu navegador prefererido para completar el proceso <a href="http://localhost:3000/confirmarCuentaAE/`+convertirJSON+`">Confirmar mi cuenta</a>`, // html body
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

//UPDATE
router.put("/updateUsuario", async (req, res) => {
    const { id_usuario, nombres, apellidos, clave, telefono, genero, fecha_nac, direccion, link_fotografia, id_pais } = req.body;
    
    if (!(nombres != "" && apellidos != "" && clave != "" && telefono != -1 && genero != "" && fecha_nac != "" && id_pais != -1 && id_usuario != -1)){
        res.status(201).json({
            "response": false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    } else{
        sql = "UPDATE USUARIO SET nombres=:nombres, apellidos=:apellidos, clave=:clave,\
                telefono=:telefono, genero=:genero, fecha_nac=TO_DATE(:fecha_nac, 'dd/mm/yyyy'), \
                direccion=:direccion, link_fotografia = :link_fotografia, id_pais=:id_pais WHERE id=:id_usuario";
        await BD.Open(sql, [nombres, apellidos, clave, telefono, genero, fecha_nac, direccion, link_fotografia, id_pais, id_usuario], true);
        res.status(201).json({
            "response": true,
            "msg": "Actualizado Correctamente"
        });
    }
});

//UPDATE
router.put("/updateUsuarioAdmEmp", async (req, res) => {
    const { id_usuario, nombres, apellidos, clave, telefono, genero, fecha_nac, direccion, link_fotografia, id_pais, id_tipo_usuario, id_estado_usuario } = req.body;

    if (!(nombres != "" && apellidos != "" && clave != "" && telefono != -1 && genero != "" && fecha_nac != "" && id_pais != -1 && id_estado_usuario != -1 && id_tipo_usuario != -1)) {
        res.status(201).json({
            "response":false,
            "msg": "No ha ingresado los campos obligatorios"
        });
    }else{
        sql = "UPDATE USUARIO SET nombres=:nombres, apellidos=:apellidos, clave=:clave,\
                telefono=:telefono, genero=:genero, fecha_nac=TO_DATE(:fecha_nac, 'dd/mm/yyyy'), \
                direccion=:direccion, link_fotografia = :link_fotografia, id_pais=:id_pais,\
                id_tipo = :id_tipousuario, id_estado_usuario = :id_estado_usuario WHERE id=:id_usuario";
        await BD.Open(sql, [nombres, apellidos, clave, telefono, genero, fecha_nac, direccion, link_fotografia, id_pais, id_tipo_usuario, id_estado_usuario, id_usuario], true);
        res.status(201).json({
            "response": true,
            "msg": "Actualizado Correctamente"
        });
    }
});

//DELETE
router.delete("/deleteUsuario/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;
    sql = "UPDATE USUARIO SET id_estado_usuario = (SELECT (ID) FROM ESTADO_USUARIO WHERE nombre='No Activo') WHERE id=:id_usuario";
    await BD.Open(sql, [id_usuario], true);
    res.json({ 
        "response": true,
        "msg": "Usuario Eliminado" 
    });
});

//READ
router.get('/getUsuarios', async (req, res) => {
    const {  } = req.params;
    sql = "SELECT USUARIO.id, USUARIO.nombres, USUARIO.apellidos, USUARIO.clave, USUARIO.telefono,\
    USUARIO.genero, TO_CHAR(USUARIO.fecha_nac, 'DD/MM/YYYY'), USUARIO.direccion, USUARIO.link_fotografia,\
    PAIS.id, PAIS.nombre, TIPO_USUARIO.id, TIPO_USUARIO.nombre, ESTADO_USUARIO.id, ESTADO_USUARIO.nombre\
    FROM USUARIO\
    INNER JOIN PAIS ON PAIS.ID = USUARIO.ID_PAIS\
    INNER JOIN TIPO_USUARIO ON TIPO_USUARIO.ID = USUARIO.ID_TIPO\
    INNER JOIN ESTADO_USUARIO ON ESTADO_USUARIO.ID = USUARIO.ID_ESTADO_USUARIO\
    ORDER BY TIPO_USUARIO.id";
    
    let result = await BD.Open(sql, [], false);
    Listado = [];

    result.rows.map(usuario => {
        let usuarioSchema = {
            "id_usuario": usuario[0],
            "nombres": usuario[1],
            "apellidos": usuario[2],
            "clave": usuario[3],
            "telefono": usuario[4],
            "genero": usuario[5],
            "fecha_nac": usuario[6],
            "direccion": usuario[7],
            "link_fotografia": usuario[8],
            "id_pais": usuario[9],
            "nombre_pais": usuario[10],
            "id_tipo_usuario": usuario[11],
            "nombre_tipo_usuario": usuario[12],
            "id_estado_usuario": usuario[13],
            "nombre_estado_usuario": usuario[14]
        }
        Listado.push(usuarioSchema);
    })
    res.status(200).json(Listado);
});

//CREATE
router.post('/addBitacora', async (req, res) => {
    const { descripcion, operacion, id_usuario } = req.body;
    sql = "BEGIN AGREGAR_BITACORA(:descripcion,:operacion,:id_usuario); END;";
    await BD.Open(sql, [descripcion, operacion, id_usuario], true);
    res.status(201).json();
});

/*INI - UTILS*/

function setBase64(json) {
    return Buffer.from(JSON.stringify(json)).toString('base64');    
}

function getJSONfromB64(base64) {
    return JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));
}

function tokenTemporal() {
    return Math.random().toString(36).substr(2);
};
/*FIN - UTILS*/
module.exports = router;