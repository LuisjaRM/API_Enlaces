// Requires ↓

const { getConnection } = require("../connectionDB");

const queryDeleteUser = async (id) => {
  let connection;
  try {
    connection = await getConnection(id);

    await connection.query(
      `
              DELETE FROM likes
              WHERE user_id = ?
            `,
      [id]
    );

    await connection.query(
      `
              DELETE FROM votes
              WHERE user_id = ?
            `,
      [id]
    );

    await connection.query(
      `
              DELETE FROM comments
              WHERE user_id = ?
            `,
      [id]
    );

    await connection.query(
      `
              DELETE FROM offers
              WHERE user_id = ?
            `,
      [id]
    );

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
