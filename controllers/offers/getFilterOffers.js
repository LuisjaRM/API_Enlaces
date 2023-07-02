// Queries requires ↓

const {
  getFilterOffersQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getFilterOffers = async (req, res, next) => {
  try {
    const { plataform } = req.params;

    let isLogin = false;
    let userId;

    if (req.userInfo != undefined) {
      isLogin = true;
      userId = req.userInfo.id;
    }

    // Query: get offers
    const offers = await getFilterOffersQuery(isLogin, userId, plataform);

    // Res.send
    res.status(201).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFilterOffers };
