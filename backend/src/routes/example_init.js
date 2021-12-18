const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getPersons', async (req, res) => {
    sql = "select * from persons";
    //query, campos, aqui se verifica si es un commit
    let result = await BD.Open(sql, [], false);
    Persons = [];

    result.rows.map(person => {
        let personSchema = {
            "code": person[0],
            "firstname": person[1],
            "lastname": person[2]
        }
        Persons.push(personSchema);
    })
    res.status(200).json(Persons);
})


//CREATE
router.post('/addPerson', async (req, res) => {
    const { firstname, lastname } = req.body;

    sql = "insert into persons(first_name,last_name) values (:firstname, :lastname)";

    await BD.Open(sql, [firstname, lastname], true);

    res.status(200).json({
        "firstname": firstname,
        "lastname": lastname
    })

})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const { codu, username, firstname, lastname } = req.body;

    sql = "update person set username=:username, firstname=:firstname, lastname=:lastname where codu=:codu";

    await BD.Open(sql, [username, firstname, lastname,codu], true);

    res.status(200).json({
        "codu": codu,
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })

})

//DELETE
router.delete("/deleteUser/:codu", async (req, res) => {
    const { codu } = req.params;

    sql = "update person set state=0 where codu=:codu";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})


module.exports = router;