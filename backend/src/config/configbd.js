const oracledb = require('oracledb');

cns = {
    user: "SYSTEM",
    password: "psw123",
    connectString: "localhost/ORCLCDB"
}

async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;