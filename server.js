const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

var app= express();

//takes the directory to be used for all hbs files and specifies them as the first and only argument
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now= new Date().toString();
  var log= now + ': ' + req.method + req.url;
  //let's put the server information in a file!
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
// });

//use the middle man
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

//helpers can also take arguments
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res)=> {
//the response when someone uses the URL:
  // res.send('<h1>hello express<h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage:"Hi there! I see you've found my website! Lovely to meet you <3"
  });
});

//adds another webpage (route) to the website
//to access, type localhost:3000/about
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

//bad -send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Ohh no. Something done goofed.'
  });
});
//bind the app to a port on our machine
//type localhost:3000 to run the app
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
