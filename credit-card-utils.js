const checkIfCreditCardIsValid = (cardNumber) => {
	let parsedCardNumber = parseInt(cardNumber, 10)

  	let evenSum = 0;
  	let oddSum = 0;
  	let index = 1;

  	while(parsedCardNumber !== 0){

      let currDigit = parsedCardNumber%10
      

      if(index%2 === 0){
        currDigit = currDigit * 2;
        evenSum = evenSum + (currDigit%10) + parseInt(currDigit/10,10);
      } else {
        oddSum = oddSum + currDigit;
      }

      parsedCardNumber = parseInt(parsedCardNumber/10,10);
      index--;
    }
    
	
    return (oddSum+evenSum)%10 === 0;
}

module.exports = checkIfCreditCardIsValid;