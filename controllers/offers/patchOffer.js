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
      if (
        validation.error.message ===
        `"url" length must be less than or equal to 280 characters long`
      )
        throw generateError(
          "El enlace no puede superar los 280 carácteres",
          401
        );

      if (
        validation.error.message === `Data too long for column 'url' at row 1`
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

    if (offer_expiry) {
      const offerExpiry = new Date(offer_expiry);
      const date = new Date();

      if (date.getTime() > offerExpiry.getTime()) {
        throw generateError(
          "La fecha de caducidad no puede ser anterior a hoy",
          401
        );
      }
    }

    // Check if exists changes in body
    if (Object.entries(req.body).length === 0) {
      throw generateError("No hay ninguna modificación realizada", 409);
    }

    // Query: Get information of the offer that we want modify
    const offer = await getSingleOfferQuery(id);

    // Check if the user is creator of the offer or is an admin
    if (
      req.userInfo.id !== offer.offerInfo[0].user_id &&
      req.userInfo.role != "admin"
    ) {
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
