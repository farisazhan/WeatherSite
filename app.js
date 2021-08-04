const express = require('express');
const app = express();
const https = require('https');

app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const location = req.body.cityName;
  const apiKey = "3ca667cc491da29947c9ecffe16d07ee";
  const unit = "metric";
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ location +',my&units='+ unit +'&appid='+ apiKey
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const desc =  weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently " + desc + " <p>");
      res.write("<h1>The temperature in " + location + " is " + temperature + " degrees celcius</h1>")
      res.write("<img src=" + imgURL + ">")
      res.send();
    });
  });
});


app.listen(3000, function(){
  console.log('Server has started on port 3000.');
});
