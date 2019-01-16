
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '912321704d0e78033912835fc5565aad';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/locDetails', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', 
		{weather: null, 
		error: 'Error, please try again',
		});
      } else {
        
        res.render('index', 
		{weather: weather.main.temp,
		city:weather.name,
		error: null,
		latitude:weather.coord.lat,
		longitude:weather.coord.lon,
		});
      }
	  
	  
	   app.get('/sendMail', function (req, res) {
		     let email = req.query.email;

 var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sharanya7illa@gmail.com',
    pass: 'Saranya$ms7'
  }
});

var mailOptions = {
  from: 'sharanya7illa@gmail.com',
  to: email,
  subject: 'Details of the location',
  text: 'Hi,\nThe following are the details of the requested location.\nName:'+weather.name+'\nTemperature:'+weather.main.temp+'\nLatitude:'+weather.coord.lat+'\nLongitude:'+weather.coord.lon+'\n\nHave a great day!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
	//res.render('index',{message:'Cannot send'});
  } else {
 
	res.render('index',{weather: null, error: null});
  }
});
});
    }
  });
  });





app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})