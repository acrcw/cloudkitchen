const express = require("express");
const { checkLogin } = require("../controller/authController");
const { getAllReviews, topthreereviews, getPlanReviews, createReview, updateReview, deleteReview } = require("../controller/reviewController");
const reviewRouter = express.Router();


reviewRouter.route("/all").get(getAllReviews)
reviewRouter.route("/top3").get(topthreereviews)
reviewRouter.route("/:planid").get(getPlanReviews)
reviewRouter.route("/review/:plan").post(checkLogin,createReview)
reviewRouter.route("/review/:reviewid").patch(checkLogin,updateReview)
reviewRouter.route("/review/:reviewid").delete(checkLogin,deleteReview)
module.exports = reviewRouter;