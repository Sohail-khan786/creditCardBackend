1. npm install
2. node .
3. attaching sample curl

curl --location 'http://localhost:8080/checkCreditCard' \
--header 'Content-Type: application/json' \
--data '{
    "card_number" : "4417123456789113"
}'


