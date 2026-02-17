const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const Listing = require("../models/listing.js");
const review = require("../models/reviews.js");
const { reviewSchema } = require('../schema.js');


// Riview Validation
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        // Collect all error messages
        const msg = error.details.map(el => el.message).join(', ');
        return res.status(400).send(msg); // You can render error page instead
    }
    next();
};



//review route //POST 

router.post("/", validateReview, wrapAsync(async(req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let newreview = new reviews({
        comment: req.body.comment,
        rating: req.body.rating
      });



    listing.reviews.push(newreview);

    await newreview.save()
    await listing.save();


    res.redirect(`/listing/${listing._id}`);
  
}));


//Delete Review Route
router.delete("/:reviewId" , wrapAsync(async(req,res) =>{
    let {id,reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await reviews.findByIdAndDelete(reviewId);
 res.redirect(`/listing/${id}`);
}))



module.exports = router;









