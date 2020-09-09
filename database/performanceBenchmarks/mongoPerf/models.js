const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/reviews', { useNewUrlParser: true });

autoIncrement.initialize(connection);


const db = connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


var authorsSchema = new Schema({
  name: String,
  product_count: Number,
  review_count: Number,
  hrs_on_record: Number
}, {collection: 'authors'});

authorsSchema.plugin(autoIncrement.plugin, { model: 'Author', field: 'id', startAt: 101});
var Author = db.model('Author', authorsSchema);


Author.create({
  name: 'Freddy',
  product_count: 5,
  review_count: 10,
  hrs_on_record: 3
}, (err, res) => {
  if(err) {
    console.log(err);
  } else {
    console.log(res);
  }
});


// Author.deleteOne({ name: 'Freddy'}).exec()
//   .then((res) => {
//     console.log(res);
// });





