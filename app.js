const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); //logging 
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/fashion');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Error'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

	if(req.method == 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'POST, GET');
		return res.status(200).json({});
	}
	next();

});




const productRoutes = require('./api/router/products');
app.use('/products', productRoutes);

const statsRoutes = require('./api/router/stats');
app.use('/stats', statsRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status(400);
	next(error);
})

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error:{
			message : error.message
		}

	});
});	


module.exports = app;

