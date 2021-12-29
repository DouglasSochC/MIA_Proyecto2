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

module.exports = router;