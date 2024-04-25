
A backend project

Steps :
Step 1
Install npm dependencies of express and mongoose using " npm install " command.

Step 2
Start the backend server using nodemon or node server.js command.

Step 3

GET http://localhost:3000/ ->As a Base URL

i Used Postman to test the output totalprice by giving POST method with address http://localhost:3000/calculate-price by giving input
{
    "zone": "A",
    "distance": 7,
    "itemType": "perishable"
}

and we get the output as
{
    "totalPrice": 13
}



live link - https://food-del-app-2.onrender.com

 
