// Requires ↓

const { getConnection } = require("../connectionDB");

const deleteUserQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection(id);

    // Delete all user references in other tables

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

    // Delete user

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

module.exports = { deleteUserQuery };
