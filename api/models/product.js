const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
{
	_id: mongoose.Schema.Types.ObjectId,
	pid:String,
	host:String,
	name:String,
	price:Number,


});


module.exports = mongoose.model('Product', productSchema);
