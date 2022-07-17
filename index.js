var parser = require('body-parser');
var path = require('path');
var express = require('express');
var fs = require('fs');
const { sendEmail } = require('./mailer');
var app = express();
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.set('view engine', 'ejs');
const viewDir = path.join(__dirname + '/views');
app.set('views', viewDir);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.redirect('/intro');
});

app.get('/intro', function (req, res) {
	res.render('Intro.ejs', {});
});

app.get('/surveypage', function (req, res) {
	res.render('Project_2', { message: '' });
});

app.post('/', async (req, res) => {
	const { email, name } = req.body;
	if (email) {
		let message = {
			to: email,
			subject: 'Thanks!',
			text: `Dear ${name}, Thank you for your feedback! – From Dhanush Parasa @ https://dhanushparasa.heroku.com .`,
		};

		await sendEmail(message);
		res.render('Project_2', { message: 'Thanks, Please check your email' });
	}
});

app.listen(process.env.PORT || 3000);
