// Function require ↓

const { savePhoto } = require("../../services/savePhoto");
const { getConnection } = require("../connectionDB");

// Requires ↓
const path = require("path");

// Query ↓

const changePhoto = async (offerId, filesOfferPhoto) => {
  let connection;

  try {
    const connection = await getConnection();

    if (filesOfferPhoto) {
      // Save photo
      const offerPhoto = await savePhoto(filesOfferPhoto);
      // const photoDir = path.join(__dirname, `./uploads/${offerPhoto}`);
      // console.log(photoDir);

      // Update avatar
      await connection.query(
        `
              UPDATE offers
              SET photo = ?
              WHERE id = ?
            `,
        [offerPhoto, offerId]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { changePhoto };
