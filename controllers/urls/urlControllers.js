// Controllers ↓

const { newUrl } = require("./newUrl");
const { allUrls } = require("./allUrls");
const { urlByID } = require("./urlByID");
const { modifyUrl } = require("./modifyUrl");
const { deleteUrl } = require("./deleteUrl");
const { voteUrl } = require("./voteUrl");

// Exports ↓

module.exports = {
  newUrl,
  allUrls,
  urlByID,
  modifyUrl,
  deleteUrl,
  voteUrl,
};
