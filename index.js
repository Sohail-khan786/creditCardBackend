
const express = require('express');
const cors = require('cors');
const checkIfCreditCardIsValid = require('./credit-card-utils');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors())

app.get("/public/health", (req,res) => {
    res.status(200).send({
        message : "Health OK"
    })
})

app.post("/checkCreditCard", (req,res) => {
    const { card_number  } =  req?.body || {};
    const parsedCardNumber = (card_number || "").toString().split(" ").join("");

    if(isNaN(Number(parsedCardNumber))){
        res.status(400).send({
            errorMessage : "card_number can only be a number and not alpa-numeric"
        })
        return;
    }

    if(!parsedCardNumber || parsedCardNumber.toString().length === 0){
        res.status(400).send({
            errorMessage : "card_number is mandatory field and cannot be empty"
        })
        return;
    }

    const isCreditCardValid = checkIfCreditCardIsValid(parsedCardNumber);

    res.status(200).send({
        isCreditCardValid
    })
})

app.listen(PORT, () => {})