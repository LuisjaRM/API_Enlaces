// Requires ↓

const { getConnection } = require("../connectionDB");



const deletUser = async(id) => {
  
    let connection;
    
    try {
        connection = await getConnection(id);

        await connection.query(
            `
              UPDATE users
              SET password="[borrado]", name="[borrado]", avatar=NULL, active=0, deleted=1, lastAuthUpdate=?
              WHERE id=?
            `,
            [new Date(), id]
        ); 
        return
    } finally  {
        if (connection) connection.release()
    }

};

module.exports = {deletUser}