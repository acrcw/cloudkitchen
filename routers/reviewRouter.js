const express = require("express");
const { checkLogin } = require("../controller/authController");
const { getAllReviews, topthreereviews, getPlanReviews, createReview, updateReview, deleteReview, getUserReviews } = require("../controller/reviewController");
const reviewRouter = express.Router();


reviewRouter.route("/all").get(getAllReviews)
reviewRouter.route("/top3").get(topthreereviews)
reviewRouter.route("/:planid").get(getPlanReviews)
reviewRouter.route("/userreviews/:id").get(getUserReviews)
reviewRouter.route("/:plan").post(createReview)
reviewRouter.route("/review/:reviewid").patch(checkLogin,updateReview)
reviewRouter.route("/review/:reviewid").delete(checkLogin,deleteReview)
module.exports = reviewRouter;