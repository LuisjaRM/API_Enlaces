// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const { authUser, offerUrlRepeat } = require("../middlewares/expMiddlewares");

// Controllers requires ↓

const {
  newOffer,
  allOffers,
  offerById,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
} = require("../controllers/offers/offerControllers");

// Routes ↓

const router = express.Router();

router.post("/offers/new-offer", authUser, offerUrlRepeat, newOffer);
router.get("/offers", authUser, allOffers);
router.get("/offers/:id", authUser, offerById);
router.patch("/offers/modify-offer/:id", authUser, modifyOffer);
router.delete("/offers/delete/:id", authUser, deleteOffer);
router.post("/offers/vote/:id", authUser, postVoteOffer);
// Ordenar por votos
// poner un comentario
// modificar un comentario
// borrar un comentario
// votar un comentario

module.exports = router;
