const { deleteCommentQuery } = require("./deleteCommentQuery");
const { deleteOfferQuery } = require("./deleteOfferQuery");
const { getAllOffersQuery } = require("./getAllOffersQuery");
const { getCheckIsFavoriteQuery } = require("./getCheckIsFavoriteQuery");
const { getDailyOffersQuery } = require("./getDailyOffersQuery");
const { getFavoritesOffersQuery } = require("./getFavoritesOffersQuery");
const { getOffersOrderByVotesQuery } = require("./getOffersOrderByVotesQuery");
const { getSingleOfferQuery } = require("./getSingleOfferQuery");
const { getSingleCommentQuery } = require("./getSingleCommentQuery");
const { patchCommentQuery } = require("./patchCommentQuery");
const { patchFavoriteQuery } = require("./patchFavoriteQuery");
const { patchOfferImageQuery } = require("./patchOfferImageQuery");
const { patchOfferQuery } = require("./patchOfferQuery");
const { postCommentQuery } = require("./postCommentQuery");
const { postLikeQuery } = require("./postLikeQuery");
const { postOfferQuery } = require("./postOfferQuery");
const { postVoteQuery } = require("./postVoteQuery");

module.exports = {
  deleteCommentQuery,
  deleteOfferQuery,
  getAllOffersQuery,
  getCheckIsFavoriteQuery,
  getDailyOffersQuery,
  getFavoritesOffersQuery,
  getOffersOrderByVotesQuery,
  getSingleOfferQuery,
  getSingleCommentQuery,
  patchCommentQuery,
  patchFavoriteQuery,
  patchOfferImageQuery,
  patchOfferQuery,
  postCommentQuery,
  postLikeQuery,
  postOfferQuery,
  postVoteQuery,
};
