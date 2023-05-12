// Function Requires ↓

const { generateError } = require("../../services/generateError");
const {
  updateOffer,
  getOfferById,
} = require("../../database/offersQueries/expOffersQueries");

// Requires Jois ↓

const { modifyOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const modifyOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { url, title, descrip, price, offer_price, plataform, offer_expiry } =
      req.body;

    // Joi validation
    const schema = modifyOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Get information of the offer that we want delete
    const offer = await getOfferById(id);

    // Check if the user is creator of the offer or is an admin
    if (req.userInfo.id !== offer.user_id && req.userInfo.role != "admin") {
      throw generateError(
        "No estás autorizado para modificar esta oferta",
        401
      );
    }

    await updateOffer(
      id,
      url,
      title,
      descrip,
      price,
      offer_price,
      plataform,
      offer_expiry
    );

    res.status(200).send({
      status: "ok",
      message: `La oferta con id: ${id} ha sido modificada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyOffer };
