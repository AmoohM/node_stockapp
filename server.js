const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

//Publishable API Token: pk_36429afc08fc4136aac7871b99b6a38c 


const call_api = (search_txt , api_results) => {
    request('https://cloud.iexapis.com/stable/stock/'+ search_txt +'/quote?token=pk_36429afc08fc4136aac7871b99b6a38c',
    {json:true},
    (err,res,body)=>{
        if(err) console.log(err);
        if (res.statusCode == 200) api_results(body);
    });
}

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

//set express hanblebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//set handlebars GET routes
app.get('/', function (req, res) {
    call_api('fb',function(api_response){
        res.render('home' ,
    {stock : api_response
    }
    );
    });
    
    
});

//set handlebars POST routes
app.post('/', function (req, res) {
    call_api(req.body.company_search,
        function(api){
            res.render('home' ,
            {stock : api}
            );
        }
    );
});



app.listen(PORT , () => console.log(`server listening on port ${PORT}`));