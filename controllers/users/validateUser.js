// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../../database/connectionDB");

// Requires Functions database ↓

const {} = require("../../database/usersQueries/usersQueries");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const validateUser = async (req, res) => {
  try {
    const connect = await getConnection();

    const { regCode } = req.params;

    // Check that user exists with that regCode
    const [user] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE regCode=?
            `,
      [regCode]
    );

    if (user.length === 0)
      return res.status(404).send("Ningún usuario con ese código");

    // Active user and delete regCode
    await connect.query(
      `
            UPDATE users
            SET active=true, regCode=NULL
            WHERE regCode = ?
            `,
      [regCode]
    );

    connect.release();

    res.status(200).send({
      status: "ok",
      message: "Usuario validado",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { validateUser };
