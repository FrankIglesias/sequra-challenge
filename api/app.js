const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const creditAgreement = require("./credit_agreement_calculator");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 8080;

app.get("/credit_agreements", (req, res) => {
  const totalWithTax = parseInt(req.query.totalWithTax, 10);
  if (isNaN(totalWithTax)) {
    res.status(400).json({ error: "'totalWithTax' not numeric" });
  } else {
    res.status(200).json(creditAgreement.calculate(totalWithTax));
  }
});

app.post("/events", (req, res) => {
  if (Math.random() >= 0.1) {
    console.log(`Event received`, req.body);
    res.status(200).send();
  } else {
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () =>
  console.log(`SeQura mocked API running on port ${port}!`)
);
