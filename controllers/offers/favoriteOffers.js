// Function require ↓

const {
  updateFavoritesOffers,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const favoriteOffers = async (req, res, next) => {
  try {
    const offer_id = req.params.id;
    const user_id = req.userInfo.id;

    // Query: get all offers
    await updateFavoritesOffers(offer_id, user_id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Oferta con id: ${offer_id} añadida a favoritas por el usuario con id: ${user_id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { favoriteOffers };
