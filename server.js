const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//port from environment variable
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');

//Express middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// //Express middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//Express middleware
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/',(req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Sunil',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // })

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page',
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs',{
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
