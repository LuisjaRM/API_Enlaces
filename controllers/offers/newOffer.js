// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓


const { createOffer } = require("../../database/offersQueries/expOffersQueries");



// Requires Jois ↓

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
    console.log(validation);

    if (validation.error) {
      return generateError(validation.error.message, 401);
    }

    // Create offer
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
    res.status(200).send({
      status: "ok",
      message: `Oferta con id (${OfferId}) subida con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newOffer };
