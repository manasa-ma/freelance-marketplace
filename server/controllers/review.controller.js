const Review = require("../models/Review");
const Gig = require("../models/Gig");

exports.createReview = async (req, res) => {
  if (req.isSeller) return res.status(403).send("Sellers cannot leave reviews!");

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    star: req.body.star,
    desc: req.body.desc,
  });

  try {
    // 1. Check if user already reviewed this gig
    const oldReview = await Review.findOne({ gigId: req.body.gigId, userId: req.userId });
    if (oldReview) return res.status(403).send("You have already reviewed this gig!");

    // 2. Save the review
    const savedReview = await newReview.save();

    // 3. Update the Gig's star count
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (err) {
    res.status(500).send("Error adding review");
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    res.status(500).send("Error fetching reviews");
  }
};