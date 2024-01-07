
const express = require('express');
const cors = require('cors');
const checkIfCreditCardIsValid = require('./credit-card-utils');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors())

const pingBackend = () => {
    axios.post('https://creditcardbackend.onrender.com/checkCreditCard', { card_number : "3213123123123" }).then((response) => {})
}

const pingFrontend = () => {
    axios.get('https://creditcardfrontend.onrender.com/').then((response) => {})
}

// Schedule the cron job to run every minute
cron.schedule('*/59 * * * *', () => {
    try {
        pingBackend()
    } catch (error) {}

    try {
        pingFrontend()
    } catch (error) {}

});

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