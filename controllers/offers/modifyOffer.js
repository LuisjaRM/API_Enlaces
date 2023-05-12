// Function Requires ↓

const { generateError } = require("../../services/generateError");
const {
  modifyOfferQuery,
} = require("../../database/offersQueries/modifyOfferQ");

// Requires Jois ↓

const { modifyOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const modifyOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      place,
      description,
      url,
      title,
      descrip,
      price,
      offer_price,
      platform,
      offer_expiry,
    } = req.body;

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

    const modify = await modifyOfferQuery(
      id,
      place,
      description,
      url,
      title,
      descrip,
      price,
      offer_price,
      platform,
      offer_expiry
    );

    res.send({
      status: "ok",
      message: "Enlace correctamente actualizado",
      data: {
        id,
        place,
        description,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyOffer };
