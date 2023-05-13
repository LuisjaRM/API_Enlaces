// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getTodayOffers = async () => {
  let connection;
  try {
    connection = await getConnection();

    const dateToday = new Date();
    console.log(dateToday);

    // const year = dateToday.toString().slice(0, 4);
    // console.log(year);
    // const month = parseInt(dateToday.toString().slice(5, 7));
    // const day = parseInt(dateToday.toString().slice(8, 10));

    // const initDay = new Date(2023, 05, 13, 2);
    // console.log(initDay);

    // const today = dateToday.toString().slice(0, 15);
    // console.log(today);
    // const prueba = new Date();

    //2023-05-13T10:59:04.084Z

    // 2023-05-12 16:11:37

    const [result] = await connection.query(
      `
        SELECT * 
        FROM offers 
        WHERE created_at = BETWEEN '20230513 00:00:00' AND '20230513 23:59:59' 
        `
    );

    let dayOfCreate = result[0].created_at;
    // dayOfCreate = dayOfCreate.toString();
    console.log(dayOfCreate);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getTodayOffers };
