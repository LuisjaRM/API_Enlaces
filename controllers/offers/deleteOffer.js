// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Queries Requires ↓

const {
  getSingleOfferQuery,
  deleteOfferQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const deleteOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: Get information of the offer that we want delete
    const offer = await getSingleOfferQuery(id);

    // Check if the user is the creator of the offer or is an admin
    if (
      req.userInfo.id !== offer.offerInfo.user_id &&
      req.userInfo.role != "admin"
    ) {
      throw generateError("No estás autorizado para borrar esta oferta", 401);
    }

    // Query: Delete offer
    await deleteOfferQuery(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `La oferta con id: ${id} fue borrada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteOffer };
