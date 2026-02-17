const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const Listing = require("../models/listing.js");

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

//index route
router.get("/" ,async(req,res) => {
    let lists = await Listing.find();
    // console.log(list);
    res.render("index.ejs" , {lists});

});

//Add new Place 
router.get("/new/place", (req, res) => {
    res.render("new.ejs");

});

//Read Route
router.get("/:id", wrapAsync( async(req,res) =>{
    let{id} = req.params;
   let item = await Listing.findById(id).populate("reviews");
//    console.log(id);
   res.render("item.ejs" , {item});

}))




//create Route
router.post("/", wrapAsync(async(req,res,next) => {
    let { title, description, image, price, location, country } = req.body.listing;

    let newlist = new Listing({
        title,
        description,
        image: { url: image },   // 👈 store properly
        price,
        location,
        country
    });



    // console.log(newlist);

    await newlist.save();
        
    
})
);



//edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });


}));

//Update route
router.put("/:id" ,wrapAsync(async(req,res) =>{
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id, { ... req.body.listing} )
    res.redirect("/listing");
}))

//Delete Route
router.delete("/:id" ,wrapAsync(async(req,res) =>{
    let{id} = req.params;
    let deleted_list = await Listing.findByIdAndDelete(id);
    console.log(deleted_list);
    res.redirect("/listing");
}));




module.exports = router;