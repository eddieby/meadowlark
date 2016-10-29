var express = require('express');

var app = express();

//设置handlebars模板引擎

var handlebars = require('express3-handlebars')
          .create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//定义幸运饼干
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a plesant surprise.",
    "Whenever possible,keep it simple",
];

app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res) {
	res.render('home');
});

app.get('/about',function(req,res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about',{fortune: randomFortune});
});

app.use(function(req,res) {
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function() {
	console.log('Express started on localhost:' + app.get('port') + ';press Ctrl-C to terminate.');
});
