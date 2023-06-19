// Function require ↓

const {
  patchFavoriteQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const patchFavorite = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    const user_id = req.userInfo.id;

    // Query: get all offers
    await patchFavoriteQuery(offerId, user_id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Oferta con id: ${offerId} añadida a favoritas por el usuario con id: ${user_id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchFavorite };
