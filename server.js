const express = require('express');
const app = express();
const exphbs = require('express-handlebars');


const PORT = process.env.PORT || 5000;

//set express hanblebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set handlebars routes
app.get('/', function (req, res) {
    res.render('home');
});



app.listen(PORT , () => console.log(`server listening on port ${PORT}`));