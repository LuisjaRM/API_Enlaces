// Queries requires ↓

const {
  getSearchQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getSearch = async (req, res, next) => {
  try {
    const { search } = req.query;

    let isLogin = false;
    let userId;

    if (req.userInfo != undefined) {
      isLogin = true;
      userId = req.userInfo.id;
    }

    let offers;

    // Query: get offers
    offers = await getSearchQuery(isLogin, userId, search);

    // Res.send
    res.status(201).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSearch };
