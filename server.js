let express = require('express');
let hbs = require('hbs');
let fs = require('fs');
let app = express();
const port = process.env.PORT || 3000 ;
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine','hbs');

app.use((req,res,next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n' , (err) =>{
    if(err)
     console.log("Unable to log the request");

     next();
  });
});
app.use('/' , (req,res) => {
  res.render('maintainence.hbs',{
    pageTitle:'Maintanence Page',
    heading:"Will be back soon",
    desc:"Site is currently under maintainence"
  })

});

app.use(express.static(__dirname + ' /public'));
app.get('/',  (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcome:"Welcome to the Home page"
  });
})

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear : new Date().getFullYear()
  });
})

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:"Unable to connect to page"
  });
})

app.listen(port,() =>{
  console.log(`Server is up and running on ${port}`);
});
