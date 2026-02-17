const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
// const Listing = require("./models/listing.js");
// const wrapAsync = require("./util/wrapAsync.js");
const ExpressError = require("./util/ExpressError.js");
// const reviews = require("./models/reviews.js");
const { reviewSchema } = require('./schema.js');

const listings = require("./routes/listing.js");
const review = require("./routes/reviews.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsmate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(() =>{
    console.log("Connection Established");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}



app.get("/" , (req,res) =>{
    res.send("It's Working");
  
})

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




app.use("/listing" , listings);
app.use("/listing/:id/reviews" , review)











// Catch-all for undefined routes (404)
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
  });


  app.use((err, req, res, next) => {
    const { statuscode = 500, message = "Something went wrong" } = err;
    res.status(statuscode).send(message);
  });




app.listen(8080 , () => {
    console.log("App is listening to port 8080");
})