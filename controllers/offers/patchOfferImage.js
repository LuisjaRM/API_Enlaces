// Function require ↓

const { generateError } = require("../../services/generateError");

// Querie require ↓

const {
  patchOfferImageQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const patchOfferImage = async (req, res, next) => {
  try {
    const { offerId } = req.params;

    let filesOfferPhoto;
    try {
      //  Save offerPhoto in a var
      filesOfferPhoto = req.files.image;
    } catch (error) {
      throw generateError("No has seleccionado ninguna imagen", 401);
    }

    // Query : Change Photo
    await patchOfferImageQuery(offerId, filesOfferPhoto);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `Foto de la oferta con id (${offerId}) modificada con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchOfferImage };
