const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//1. Jugadores de X equipo
router.get('/getReporteUnoClt/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;
    sql = "SELECT JUGADOR.ID, JUGADOR.NOMBRES, TO_CHAR(JUGADOR.FECHA_NAC,'DD/MM/YYYY'),\
        PAIS.ID, PAIS.NOMBRE, \
        POSICION_JUGADOR.ID, POSICION_JUGADOR.NOMBRE, \
        EQUIPO.ID, EQUIPO.NOMBRE\
        FROM TRAYECTORIA_JUGADOR\
        INNER JOIN JUGADOR ON JUGADOR.ID = TRAYECTORIA_JUGADOR.ID_JUGADOR\
        INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_JUGADOR.ID_EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = JUGADOR.ID_NACIONALIDAD\
        INNER JOIN POSICION_JUGADOR ON POSICION_JUGADOR.ID = JUGADOR.ID_POSICION\
        WHERE TRAYECTORIA_JUGADOR.ID_EQUIPO = :id_equipo AND TRAYECTORIA_JUGADOR.FECHA_FINAL IS NULL\
        ORDER BY JUGADOR.NOMBRES ASC";
    
    let result = await BD.Open(sql, [id_equipo], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "fecha_nac": registro[2],
            "id_pais": registro[3],
            "nombre_pais": registro[4],
            "id_posicion": registro[5],
            "nombre_posicion": registro[6],
            "id_equipo": registro[7],
            "nombre_equipo": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//2. Técnico de X equipo
router.get('/getReporteDosClt/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;
    sql = "SELECT \
            TECNICO.ID, TECNICO.NOMBRES, TO_CHAR(TECNICO.FECHA_NAC,'DD/MM/YYYY'), TECNICO.LINK_FOTOGRAFIA,\
            PAIS.ID, PAIS.NOMBRE,\
            EQUIPO.ID, EQUIPO.NOMBRE\
            FROM TRAYECTORIA_TECNICO\
            INNER JOIN TECNICO ON TECNICO.ID = TRAYECTORIA_TECNICO.ID_TECNICO\
            INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_TECNICO.ID_EQUIPO\
            INNER JOIN PAIS ON PAIS.ID = TECNICO.ID_NACIONALIDAD\
            WHERE TRAYECTORIA_TECNICO.ID_EQUIPO = :id_equipo AND TRAYECTORIA_TECNICO.FECHA_FINAL IS NULL\
            ORDER BY TECNICO.NOMBRES ASC";
    
    let result = await BD.Open(sql, [id_equipo], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "fecha_nac": registro[2],
            "link_fotografia": registro[3],
            "id_pais": registro[4],
            "nombre_pais": registro[5],
            "id_equipo": registro[6],
            "nombre_equipo": registro[7]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//3. Jugadores mayores a X años
router.get('/getReporteTresClt/:edad', async (req, res) => {
    const { edad } = req.params;
    sql = "SELECT JUGADOR.ID, JUGADOR.NOMBRES, TO_CHAR(JUGADOR.FECHA_NAC,'DD/MM/YYYY'),\
        PAIS.ID, PAIS.NOMBRE,\
        POSICION_JUGADOR.ID, POSICION_JUGADOR.NOMBRE,\
        EQUIPO.ID, EQUIPO.NOMBRE\
        FROM TRAYECTORIA_JUGADOR\
        INNER JOIN JUGADOR ON JUGADOR.ID = TRAYECTORIA_JUGADOR.ID_JUGADOR\
        INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_JUGADOR.ID_EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = JUGADOR.ID_NACIONALIDAD\
        INNER JOIN POSICION_JUGADOR ON POSICION_JUGADOR.ID = JUGADOR.ID_POSICION\
        WHERE TRUNC(months_between(sysdate, JUGADOR.FECHA_NAC) / 12) > :edad AND TRAYECTORIA_JUGADOR.FECHA_FINAL IS NULL\
        ORDER BY JUGADOR.NOMBRES ASC";
    
    let result = await BD.Open(sql, [edad], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "fecha_nac": registro[2],
            "id_pais": registro[3],
            "nombre_pais": registro[4],
            "id_posicion": registro[5],
            "nombre_posicion": registro[6],
            "id_equipo": registro[7],
            "nombre_equipo": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//4. Técnico mayores a X años
router.get('/getReporteCuatro/:edad', async (req, res) => {
    const { edad } = req.params;
    sql = "SELECT \
            TECNICO.ID, TECNICO.NOMBRES, TO_CHAR(TECNICO.FECHA_NAC,'DD/MM/YYYY'), TECNICO.LINK_FOTOGRAFIA,\
            PAIS.ID, PAIS.NOMBRE,\
            EQUIPO.ID, EQUIPO.NOMBRE\
            FROM TRAYECTORIA_TECNICO\
            INNER JOIN TECNICO ON TECNICO.ID = TRAYECTORIA_TECNICO.ID_TECNICO\
            INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_TECNICO.ID_EQUIPO\
            INNER JOIN PAIS ON PAIS.ID = TECNICO.ID_NACIONALIDAD\
            WHERE TRUNC(months_between(sysdate, TECNICO.FECHA_NAC) / 12) > :edad AND TRAYECTORIA_TECNICO.FECHA_FINAL IS NULL\
            ORDER BY TECNICO.NOMBRES ASC";
    
    let result = await BD.Open(sql, [edad], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "fecha_nac": registro[2],
            "link_fotografia": registro[3],
            "id_pais": registro[4],
            "nombre_pais": registro[5],
            "id_equipo": registro[6],
            "nombre_equipo": registro[7]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//5. Jugadores menores a X años
router.get('/getReporteCincoClt/:edad', async (req, res) => {
    const { edad } = req.params;
    sql = "SELECT JUGADOR.ID, JUGADOR.NOMBRES, TO_CHAR(JUGADOR.FECHA_NAC,'DD/MM/YYYY'),\
        PAIS.ID, PAIS.NOMBRE,\
        POSICION_JUGADOR.ID, POSICION_JUGADOR.NOMBRE,\
        EQUIPO.ID, EQUIPO.NOMBRE\
        FROM TRAYECTORIA_JUGADOR\
        INNER JOIN JUGADOR ON JUGADOR.ID = TRAYECTORIA_JUGADOR.ID_JUGADOR\
        INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_JUGADOR.ID_EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = JUGADOR.ID_NACIONALIDAD\
        INNER JOIN POSICION_JUGADOR ON POSICION_JUGADOR.ID = JUGADOR.ID_POSICION\
        WHERE TRUNC(months_between(sysdate, JUGADOR.FECHA_NAC) / 12) < :edad AND TRAYECTORIA_JUGADOR.FECHA_FINAL IS NULL\
        ORDER BY JUGADOR.NOMBRES ASC";
    
    let result = await BD.Open(sql, [edad], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "fecha_nac": registro[2],
            "id_pais": registro[3],
            "nombre_pais": registro[4],
            "id_posicion": registro[5],
            "nombre_posicion": registro[6],
            "id_equipo": registro[7],
            "nombre_equipo": registro[8]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//6. Tecnicos menores a X años
router.get('/getReporteSeisClt/:edad', async (req, res) => {
    const { edad } = req.params;
    sql = "SELECT \
            TECNICO.ID, TECNICO.NOMBRES, TO_CHAR(TECNICO.FECHA_NAC,'DD/MM/YYYY'), TECNICO.LINK_FOTOGRAFIA,\
            PAIS.ID, PAIS.NOMBRE,\
            EQUIPO.ID, EQUIPO.NOMBRE\
            FROM TRAYECTORIA_TECNICO\
            INNER JOIN TECNICO ON TECNICO.ID = TRAYECTORIA_TECNICO.ID_TECNICO\
            INNER JOIN EQUIPO ON EQUIPO.ID = TRAYECTORIA_TECNICO.ID_EQUIPO\
            INNER JOIN PAIS ON PAIS.ID = TECNICO.ID_NACIONALIDAD\
            WHERE TRUNC(months_between(sysdate, TECNICO.FECHA_NAC) / 12) < :edad AND TRAYECTORIA_TECNICO.FECHA_FINAL IS NULL\
            ORDER BY TECNICO.NOMBRES ASC";
    
    let result = await BD.Open(sql, [edad], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombres": registro[1],
            "fecha_nac": registro[2],
            "link_fotografia": registro[3],
            "id_pais": registro[4],
            "nombre_pais": registro[5],
            "id_equipo": registro[6],
            "nombre_equipo": registro[7]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//7. Equipos que participaron en X competición
router.get('/getReporteSieteClt/:id_competicion', async (req, res) => {
    const { id_competicion } = req.params;
    sql = "SELECT EQUIPO.LINK_FOTOGRAFIA, EQUIPO.ID, EQUIPO.NOMBRE, TO_CHAR(EQUIPO.FECHA_FUNDACION,'DD/MM/YYYY'),\
        PAIS_EQUIPO.ID, PAIS_EQUIPO.NOMBRE\
        FROM HISTORIAL_COMPETENCIA\
        INNER JOIN COMPETENCIA ON COMPETENCIA.ID = HISTORIAL_COMPETENCIA.ID_COMPETENCIA\
        INNER JOIN PAIS PAIS_COMPETENCIA ON PAIS_COMPETENCIA.ID = COMPETENCIA.ID_PAIS\
        INNER JOIN EQUIPO ON EQUIPO.ID = HISTORIAL_COMPETENCIA.ID_EQUIPO\
        INNER JOIN PAIS PAIS_EQUIPO ON PAIS_EQUIPO.ID = EQUIPO.ID_PAIS\
        WHERE COMPETENCIA.ID = :id_competicion";
    
    let result = await BD.Open(sql, [id_competicion], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "link_fotografia": registro[0],
            "id_equipo": registro[1],
            "nombre_equipo": registro[2],
            "fecha_fundacion": registro[3],
            "id_pais_equipo": registro[4],
            "nombre_pais": registro[5]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//8. Equipos de X país
router.get('/getReporteOchoClt/:id_pais', async (req, res) => {
    const { id_pais } = req.params;
    sql = "SELECT EQUIPO.LINK_FOTOGRAFIA, EQUIPO.ID, EQUIPO.NOMBRE, TO_CHAR(EQUIPO.FECHA_FUNDACION,'DD/MM/YYYY'),\
            PAIS.ID, PAIS.NOMBRE\
            FROM EQUIPO\
            INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
            WHERE PAIS.ID = :id_pais";
    
    let result = await BD.Open(sql, [id_pais], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "link_fotografia": registro[0],
            "id_equipo": registro[1],
            "nombre_equipo": registro[2],
            "fecha_fundacion": registro[3],
            "id_pais_equipo": registro[4],
            "nombre_pais": registro[5]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//9. Equipos con X años de antigüedad
router.get('/getReporteNueveClt/:anios', async (req, res) => {
    const { anios } = req.params;
    sql = "SELECT EQUIPO.LINK_FOTOGRAFIA, EQUIPO.ID, EQUIPO.NOMBRE, TO_CHAR(EQUIPO.FECHA_FUNDACION,'DD/MM/YYYY'),\
        PAIS.ID, PAIS.NOMBRE\
        FROM EQUIPO\
        INNER JOIN PAIS ON PAIS.ID = EQUIPO.ID_PAIS\
        WHERE TRUNC(months_between(sysdate, EQUIPO.FECHA_FUNDACION) / 12) = :anios";
    
    let result = await BD.Open(sql, [anios], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "link_fotografia": registro[0],
            "id_equipo": registro[1],
            "nombre_equipo": registro[2],
            "fecha_fundacion": registro[3],
            "id_pais_equipo": registro[4],
            "nombre_pais": registro[5]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//10. Estadios en X país
router.get('/getReporteDiezClt/:id_pais', async (req, res) => {
    const { id_pais } = req.params;
    sql = "SELECT ESTADIO.ID, ESTADIO.NOMBRE, TO_CHAR(ESTADIO.FECHA_INAGURACION,'DD/MM/YYYY'), ESTADIO.CAPACIDAD, ESTADIO.DIRECCION, ESTADIO.LINK_FOTOGRAFIA,\
        PAIS.ID, PAIS.NOMBRE,\
        ESTADO_ESTADIO.ID, ESTADO_ESTADIO.NOMBRE\
        FROM ESTADIO\
        LEFT JOIN PAIS ON PAIS.ID = ESTADIO.ID_PAIS\
        LEFT JOIN ESTADO_ESTADIO ON ESTADO_ESTADIO.ID = ESTADIO.ID_ESTADO\
        WHERE ESTADIO.ID_PAIS = :id_pais";
    
    let result = await BD.Open(sql, [id_pais], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombre_estadio": registro[1],
            "fecha_inaguracion": registro[2],
            "capacidad": registro[3],
            "direccion": registro[4],
            "link_fotografia": registro[5],
            "id_pais": registro[6],
            "nombre_pais": registro[7],
            "id_estado_estadio": registro[8],
            "nombre_estado_estadio": registro[9]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//11. Estadios con capacidad menor o igual a X
router.get('/getReporteOnceClt/:cantidad', async (req, res) => {
    const { cantidad } = req.params;
    sql = "SELECT ESTADIO.ID, ESTADIO.NOMBRE, TO_CHAR(ESTADIO.FECHA_INAGURACION,'DD/MM/YYYY'), ESTADIO.CAPACIDAD, ESTADIO.DIRECCION, ESTADIO.LINK_FOTOGRAFIA,\
        PAIS.ID, PAIS.NOMBRE,\
        ESTADO_ESTADIO.ID, ESTADO_ESTADIO.NOMBRE\
        FROM ESTADIO\
        LEFT JOIN PAIS ON PAIS.ID = ESTADIO.ID_PAIS\
        LEFT JOIN ESTADO_ESTADIO ON ESTADO_ESTADIO.ID = ESTADIO.ID_ESTADO\
        WHERE ESTADIO.CAPACIDAD <= :cantidad";
    
    let result = await BD.Open(sql, [cantidad], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "id": registro[0],
            "nombre_estadio": registro[1],
            "fecha_inaguracion": registro[2],
            "capacidad": registro[3],
            "direccion": registro[4],
            "link_fotografia": registro[5],
            "id_pais": registro[6],
            "nombre_pais": registro[7],
            "id_estado_estadio": registro[8],
            "nombre_estado_estadio": registro[9]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//12. Histórico de partidos de X equipo || Listado de partidos de X equipo
router.get('/getReporteDoceClt/:id_equipo', async (req, res) => {
    const { id_equipo } = req.params;
    sql = "SELECT TO_CHAR(PARTIDO.FECHA,'DD/MM/YYYY'), PARTIDO.ASISTENCIA, PARTIDO.RESULTADO,\
        ESTADIO.ID, ESTADIO.NOMBRE,\
        ESTADO_PARTIDO.ID, ESTADO_PARTIDO.NOMBRE,\
        E1.ID, E1.NOMBRE,\
        E2.ID, E2.NOMBRE\
        FROM PARTIDO\
        INNER JOIN ESTADIO ON ESTADIO.ID = PARTIDO.ID_ESTADIO\
        INNER JOIN ESTADO_PARTIDO ON ESTADO_PARTIDO.ID = PARTIDO.ID_ESTADO\
        INNER JOIN EQUIPO E1 ON E1.ID = PARTIDO.ID_EQUIPO_LOCAL\
        INNER JOIN EQUIPO E2 ON E2.ID = PARTIDO.ID_EQUIPO_VISITA\
        WHERE E1.ID = :id_equipo OR E2.ID = :id_equipo";
    
    let result = await BD.Open(sql, [id_equipo], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "fecha": registro[0],
            "asistencia": registro[1],
            "resultado": registro[2],
            "id_estadio": registro[3],
            "nombre_estadio": registro[4],
            "id_estado_partido": registro[5],
            "nombre_estado_partido": registro[6],
            "id_equipo_local": registro[7],
            "nombre_equipo_local": registro[8],
            "id_equipo_visita": registro[9],
            "nombre_equipo_visita": registro[10]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//13. Listado de partidos entre X equipo contra Y equipo
router.get('/getReporteTreceClt/:id_equipo_1/:id_equipo_2', async (req, res) => {
    const { id_equipo_1, id_equipo_2 } = req.params;
    sql = "SELECT TO_CHAR(PARTIDO.FECHA,'DD/MM/YYYY'), PARTIDO.ASISTENCIA, PARTIDO.RESULTADO,\
        ESTADIO.ID, ESTADIO.NOMBRE,\
        ESTADO_PARTIDO.ID, ESTADO_PARTIDO.NOMBRE,\
        E1.ID, E1.NOMBRE,\
        E2.ID, E2.NOMBRE\
        FROM PARTIDO\
        INNER JOIN ESTADIO ON ESTADIO.ID = PARTIDO.ID_ESTADIO\
        INNER JOIN ESTADO_PARTIDO ON ESTADO_PARTIDO.ID = PARTIDO.ID_ESTADO\
        INNER JOIN EQUIPO E1 ON E1.ID = PARTIDO.ID_EQUIPO_LOCAL\
        INNER JOIN EQUIPO E2 ON E2.ID = PARTIDO.ID_EQUIPO_VISITA\
        WHERE (E1.ID = :id_equipo_1 AND E2.ID = :id_equipo_2) OR (E1.ID = :id_equipo_2 AND E2.ID = :id_equipo_1)";
    
    let result = await BD.Open(sql, [id_equipo_1, id_equipo_2], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "fecha": registro[0],
            "asistencia": registro[1],
            "resultado": registro[2],
            "id_estadio": registro[3],
            "nombre_estadio": registro[4],
            "id_estado_partido": registro[5],
            "nombre_estado_partido": registro[6],
            "id_equipo_local": registro[7],
            "nombre_equipo_local": registro[8],
            "id_equipo_visita": registro[9],
            "nombre_equipo_visita": registro[10]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});

//14. Listado de partidos en X año
router.get('/getReporteCatorceClt/:anio', async (req, res) => {
    const { anio } = req.params;
    sql = "SELECT TO_CHAR(PARTIDO.FECHA,'DD/MM/YYYY'), PARTIDO.ASISTENCIA, PARTIDO.RESULTADO,\
        ESTADIO.ID, ESTADIO.NOMBRE,\
        ESTADO_PARTIDO.ID, ESTADO_PARTIDO.NOMBRE,\
        E1.ID, E1.NOMBRE,\
        E2.ID, E2.NOMBRE\
        FROM PARTIDO\
        INNER JOIN ESTADIO ON ESTADIO.ID = PARTIDO.ID_ESTADIO\
        INNER JOIN ESTADO_PARTIDO ON ESTADO_PARTIDO.ID = PARTIDO.ID_ESTADO\
        INNER JOIN EQUIPO E1 ON E1.ID = PARTIDO.ID_EQUIPO_LOCAL\
        INNER JOIN EQUIPO E2 ON E2.ID = PARTIDO.ID_EQUIPO_VISITA\
        WHERE EXTRACT(YEAR FROM PARTIDO.FECHA) = :anio";
    
    let result = await BD.Open(sql, [anio], false);
    Listado = [];

    result.rows.map(registro => {
        let lSchema = {
            "fecha": registro[0],
            "asistencia": registro[1],
            "resultado": registro[2],
            "id_estadio": registro[3],
            "nombre_estadio": registro[4],
            "id_estado_partido": registro[5],
            "nombre_estado_partido": registro[6],
            "id_equipo_local": registro[7],
            "nombre_equipo_local": registro[8],
            "id_equipo_visita": registro[9],
            "nombre_equipo_visita": registro[10]
        }
        Listado.push(lSchema);
    })
    res.status(200).json(Listado);
});



module.exports = router;