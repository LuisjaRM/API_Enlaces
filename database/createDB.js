// Requires ↓

require("dotenv").config();
const { getConnection } = require("./connectionDB");

// Añadir chalk

// Database config ↓

async function createDB() {
  let connection;

  try {
    connection = await getConnection();

    // await connection.query(`CREATE DATABASE enlaces`);

    console.log("Borrando tablas existentes");

    await connection.query(`DROP TABLE IF EXISTS votes`);
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS urls`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("Creando tablas");

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
        recoverCode CHAR(36)
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     )`);

    await connection.query(`
     CREATE TABLE urls (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED NOT NULL,
        title VARCHAR(60) NOT NULL,
        description VARCHAR(280),
        image VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
     )`);

    // precio
    // descuento

    await connection.query(`
    CREATE TABLE comments (
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       dateComments DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       comment VARCHAR(280),
       url_id INT UNSIGNED NOT NULL,
       FOREIGN KEY (url_id) REFERENCES urls(id)
   )`);

    await connection.query(`
     CREATE TABLE votes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        dateVote DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        vote TINYINT NOT NULL CHECK (vote IN (1,2,3,4,5)),
        user_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        url_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (url_id) REFERENCES urls(id),
        comments_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (comments_id) REFERENCES comments(id),
        UNIQUE (user_id, url_id)
    )`);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

createDB();
