
// Setting up the instance for the express server
let express = require('express');
let itp = express();

// Initialising the floor states
let erState = 'closed';
let shopState = 'open';

// Initialising the multiplication variables
let userNumberOne = 0;
let userNumberTwo = 0;

// Defining the port for the server
itp.listen(8000, function(){
  console.log("Server has been started on " + this.address().port + " port.");
});

// Defining different states and routes
itp.use('/', express.static('public'));

itp.get('/erstatus', erStatus);
itp.get('/erstatus/:erupdate', toggleErStatus);

itp.get('/shopstatus', shopStatus);
itp.get('/shopstatus/:shopupdate', toggleShopStatus);

itp.get('/multiplication/', multiplication);
itp.get('/multiplication/numberone/:usernumberone/numbertwo/:usernumbertwo', multiplicationLogic);

itp.get('/randomnumber', randomNumber);


// Random number generater
function randomNumber(request, response){
   let randomNum = Math.floor(Math.random() * Math.floor(6));

   response.send('Your dice roll was ' + randomNum);

   response.end();
}

// multiplication usegae logic
function multiplication(request, response){
  response.send('Follow this format to input numbers & multiply numberone/YourFirstnumber/numbertwo/YourSecondNumber');
  response.end();
}

// multiplication logic
function multiplicationLogic(request, response){
  userNumberOne = request.params.usernumberone;
  userNumberTwo = request.params.usernumbertwo;

  let product = userNumberOne*userNumberTwo;

  response.send('the product is ' + product);

  response.end();
}

// Equipment room realted logic
function erStatus(request, response){
  response.send('The Equipment Room is currently ' + erState);
  response.end();
}

// Equipment room admin logic
function toggleErStatus(request, response){
  let newErState = request.params.erupdate;

  if(newErState == 'closed'){
    response.send('The Equipment Room is now ' + newErState);
    erState = newErState;
  } else if(newErState == 'open'){
      response.send('The Equipment Room is now ' + newErState);
      erState = newErState;
  } else {
      response.send('The Equipment Room is either open or closed there is no ' + newErState);
  }
  response.end();
}


// Shop realted logic
function shopStatus(request, response){
  response.send('The Shop is currently ' + shopState);
  response.end();
}

// Shop admin logic
function toggleShopStatus(request, response){
  let newShopState = request.params.shopupdate;

  if(newShopState == 'closed'){
    response.send('The Shop is now ' + newShopState);
    shopState = newShopState;
  } else if(newShopState == 'open'){
      response.send('The Shop is now ' + newShopState);
      shopState = newShopState;
  } else {
      response.send('The Shop is either open or closed there is no ' + newErState);
  }
  response.end();
}
