const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
//const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY)
//var cors = require('cors');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

//express.use(cors());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
//app.use("/api/checkout", stripeRoute);


// routes starts here -->
// stripe payment -->
app.post("/payment",(req, res) =>{
  const {product, token } = req.body;

  return stripe.customers.create({
    source: token.id,
    email: token.email
  }).then(customer => {
    stripe.charges.create({
      source: product.tokenId,
      amount: product.amount * 100,
      currency: "usd",
    });
  }).then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});


// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

// listening to port -->
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
