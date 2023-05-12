// Requires ↓

const { getConnection } = require("../connectionDB");

const queryDeleteUser = async (id) => {
  let connection;
  try {
    connection = await getConnection(id);

    await connection.query(
      `
              DELETE FROM users
              WHERE id = ?
            `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { queryDeleteUser };
