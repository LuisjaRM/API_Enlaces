// Function require ↓

const {
  changePhoto,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const modifyPhoto = async (req, res, next) => {
  try {
    const offerId = req.params.id;

    //  Save offerPhoto in a var
    const filesOfferPhoto = req.files.photo;

    // Query : Change Photo
    await changePhoto(offerId, filesOfferPhoto);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `Foto de la oferta con id (${offerId}) modificada con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyPhoto };
