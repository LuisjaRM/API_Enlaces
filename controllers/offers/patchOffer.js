// Function Requires ↓

const { generateError } = require("../../services/generateError");

// Queries Requires ↓

const {
  getSingleOfferQuery,
  patchOfferQuery,
} = require("../../database/offersQueries/-exportQueries");

// Jois Requires ↓

const { modifyOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const patchOffer = async (req, res, next) => {
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

    // Check if exists changes in body
    if (Object.entries(req.body).length === 0) {
      throw generateError("No hay ninguna modificación realizada", 409);
    }

    // Query: Get information of the offer that we want modify
    const offer = await getSingleOfferQuery(id);

    // Check if the user is creator of the offer or is an admin
    if (req.userInfo.id !== offer.user_id && req.userInfo.role != "admin") {
      throw generateError(
        "No estás autorizado para modificar esta oferta",
        401
      );
    }

    await patchOfferQuery(
      id,
      url,
      title,
      descrip,
      price,
      offer_price,
      plataform,
      offer_expiry
    );

    res.status(201).send({
      status: "ok",
      message: `La oferta con id: ${id} modificada con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchOffer };
