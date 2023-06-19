// Function require ↓

const { savePhoto } = require("../../services/savePhoto");
const { getConnection } = require("../connectionDB");

// Query ↓

const patchOfferImageQuery = async (offerId, filesOfferPhoto) => {
  let connection;

  try {
    const connection = await getConnection();

    if (filesOfferPhoto) {
      // Save photo
      const offerPhoto = await savePhoto(filesOfferPhoto);

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

module.exports = { patchOfferImageQuery };
