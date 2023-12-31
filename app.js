const http = require('https');
const express = require('express');
const { request } = require('http');
const app = express();

app.set('view engine', 'ejs');
const hostname = '127.0.0.1';
const port = 3000;

app.get("/tvShows", (request , response) => {
  const options = {
    method: 'GET',
    hostname: 'imdb-top-100-movies.p.rapidapi.com',
    port: null,
    path: '/top100movies',
    headers: {
      'X-RapidAPI-Key': '8e1a1b0a44msh340e32aea1c82abp165143jsnd93f434443cd',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };
  
  const req = http.request(options, function (res) {
    const chunks = [];
  
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });
  
    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      let data = JSON.parse(body);
     //for filtiring
      filterRating = data.filter((movie) => movie.rating <= 9.0);
      filterCatalog = data.filter((movie) => movie.genre == "Drama");

      response.render('index.ejs',{movie:data})
    });
  });
  
  req.end();

});



app.listen(port , () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//for filtiring

let filterRating = [];
let filterCatalog = [];
app.get("/Rating",(request , response) => {
  response.render("index.ejs" , {movie:filterRating});
});
app.get("/Catalog" , (request , response) => {
  response.render("index.ejs" , {movie:filterCatalog});
});

