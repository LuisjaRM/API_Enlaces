// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  createOffer,
} = require("../../database/offersQueries/expOffersQueries");

// Joi require ↓

const { newOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const newOffer = async (req, res, next) => {
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

    // Query: Create offer
    const OfferId = await createOffer(
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
      message: `Oferta con id (${OfferId}) creada con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newOffer };
