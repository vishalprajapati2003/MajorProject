const express = require("express");
const router = express.Router({ mergeParams: true });
//  mergeParams: true, is used to merge the params of the parent router with the child router
//    e.g. localhost:3000/listings/123/reviews/456 will be merged with localhost:3000/listings/123

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const {reviewSchema } = require("../schema.js"); //Joi is used for  server side validation
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
// Post Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);
// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
