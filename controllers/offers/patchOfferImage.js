// Querie require ↓

const {
  patchOfferImageQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const patchOfferImage = async (req, res, next) => {
  try {
    const { offerId } = req.params;

    //  Save offerPhoto in a var
    const filesOfferPhoto = req.files.image;

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
