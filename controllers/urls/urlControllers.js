// Requires ↓
const { a } = require("../../database/urlDB");

// Controllers ↓

const newUrl = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de newUrl",
    });
  } catch (error) {
    next(error);
  }
};

const allUrls = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un get de allUrls",
    });
  } catch (error) {
    next(error);
  }
};

const urlByID = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un get de urlByID",
    });
  } catch (error) {
    next(error);
  }
};

const modifyUrl = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un path de modifyUrl",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUrl = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un delete de deleteUrl",
    });
  } catch (error) {
    next(error);
  }
};

const voteUrl = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de voteUrl",
    });
  } catch (error) {
    next(error);
  }
};

// Exports ↓

module.exports = {
  newUrl,
  allUrls,
  urlByID,
  modifyUrl,
  deleteUrl,
  voteUrl,
};
