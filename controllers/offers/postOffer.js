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
      if (
        validation.error.message ===
        `"url" length must be less than or equal to 280 characters long`
      )
        throw generateError(
          "El enlace no puede superar los 280 carácteres",
          401
        );

      if (
        validation.error.message ===
        `"title" length must be less than or equal to 60 characters long`
      )
        throw generateError(
          "El título no puede superar los 60 carácteres",
          401
        );

      if (
        validation.error.message ===
        `"descrip" length must be less than or equal to 280 characters long`
      )
        throw generateError(
          "La descripción no puede superar los 280 carácteres",
          401
        );

      if (
        validation.error.message === `"offer_price" must be a positive number`
      )
        throw generateError("El precio no puede ser negativo", 401);

      if (validation.error.message === `"price" must be a positive number`)
        throw generateError("El precio no puede ser negativo", 401);

      if (
        validation.error.message ===
        `"plataform" length must be less than or equal to 60 characters long`
      )
        throw generateError(
          "La plataforma no puede superar los 60 carácteres",
          401
        );
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
