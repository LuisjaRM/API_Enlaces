// Requires npm ↓

require("dotenv").config();
const chalk = require("chalk");

// Requires ↓

const { getConnection } = require("./connectionDB");

// Database config ↓

async function createDB() {
  let connection;

  try {
    connection = await getConnection();

    // await connection.query(`CREATE DATABASE enlaces`);

    console.log(chalk.blue("Borrando tablas existentes"));

    await connection.query(`DROP TABLE IF EXISTS votes`);
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS offers`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log(chalk.blue("Creando tablas"));

    await connection.query(`
     CREATE TABLE users (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        user VARCHAR(100) UNIQUE NOT NULL,
        avatar VARCHAR(100),
        role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
        deleted BOOLEAN DEFAULT false,
        lastAuthUpdate DATETIME,
        active BOOLEAN DEFAULT false,
        regCode CHAR(36),
        recoverCode CHAR(36),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     )`);

    await connection.query(`
     CREATE TABLE offers (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED NOT NULL,
        url VARCHAR(280) NOT NULL,
        title VARCHAR(60) NOT NULL,
        descrip VARCHAR(280),
        price decimal(10,2),
        offer_price decimal(10,2),
        plataform VARCHAR(60),
        offer_expiry date,
        avgVotes decimal(10,8),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
     )`);

    await connection.query(`
    CREATE TABLE comments (
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       dateComments DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       comment VARCHAR(280),
       user_id INT UNSIGNED NOT NULL,
       FOREIGN KEY (user_id) REFERENCES users(id),
       offer_id INT UNSIGNED NOT NULL,
       FOREIGN KEY (offer_id) REFERENCES offers(id)
   )`);

    await connection.query(`
     CREATE TABLE votes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dateVote DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        vote TINYINT NOT NULL CHECK (vote IN (1,2,3,4,5)),
        user_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        offer_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (offer_id) REFERENCES offers(id),
        comments_id INT UNSIGNED,
        FOREIGN KEY (comments_id) REFERENCES comments(id),
        UNIQUE (user_id, offer_id)
    )`);

    console.log(chalk.yellow("Base de datos creada"));
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

createDB();
