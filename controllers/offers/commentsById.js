// Function require ↓

const {
    getCommentsById,
  } = require("../../database/offersQueries/expOffersQueries");
  
  // Controller ↓
  
  const commentsById = async (req, res, next) => {
    try {
      const offerId = req.params.id;
  
      // Query: get offer by id
      const comments = await getCommentsById(offerId);
  
      // Res.send
      res.status(200).send({
        status: "ok",
        message: comments,
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { commentsById };