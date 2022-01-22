const router = require("express").Router();
//const stripe = require("stripe")("sk_test_51KCiN0SD4YSwZPGXgT1Qdb2sd651trOpq48mFpR07hAGS56u8Awo41G5msLYnU1coRlo7E0MKgT8xJW5k5lFrDdB00Qm4orcMW");
const KEY = process.env.STRIPE_KEY
//const KEY = "sk_test_51KHoM8SE9inOWbqXh9GaqYPUfXHuPL1FRd3axMc9R6EeB788pEQqrLltDimhZ7yZQGnVSvUBLio1HOZQ8BczRR0D00q9bhYKRX"
const stripe = require("stripe")(KEY);


router.post("/payment", (req, res) => {

  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount * 100,
      currency: "usd",
    },
    
    (stripeErr, stripeRes) => {
      // console.log(req.body.tokenId)
      // console.log(req.body.amount)
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log("payment failed")             // testing
      } else {
        res.status(200).json(stripeRes);
        console.log("success")                    // testing
      }
    }
  );
});

module.exports = router;
