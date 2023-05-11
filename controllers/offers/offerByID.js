// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/offersQueries/expOffersQueries");


// Controller ↓

const offerByID = async (req, res, next) => {
  try {

   const offerID = await getOfferByID()

    res.send({
      status: "ok",
      message: offerID,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = { offerByID };
