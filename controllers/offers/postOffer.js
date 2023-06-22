// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Querie require ↓

const {
  postOfferQuery,
} = require("../../database/offersQueries/-exportQueries");

// Joi require ↓

const { newOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const postOffer = async (req, res, next) => {
  try {
    const { url, title, descrip, price, offer_price, plataform, offer_expiry } =
      req.body;

    const { id } = req.userInfo;

    // Joi validation
    const schema = newOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    const offerExpiry = new Date(offer_expiry);
    const date = new Date();

    if (date.getTime() > offerExpiry.getTime()) {
      throw generateError(
        "La fecha de caducidad no puede ser anterior a hoy",
        401
      );
    }

    // Query: Create offer
    const offerId = await postOfferQuery(
      id,
      url,
      title,
      descrip,
      price,
      offer_price,
      plataform,
      offer_expiry
    );

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `Oferta con id (${offerId}) creada con éxito`,
      data: {
        id: offerId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postOffer };
