var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const moment = require('moment');

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("reviews");
  let startTime = new Date();

  let query = {id: 300000};
  console.log('Testing MongoDB Queries')
  dbo.collection("allReviews").findOne(query, function (err, result) {
    if (err) throw err;
    let end = new Date();
    let time = end - startTime || 0;
    console.log('Running Query #1...');
    console.log('Query Time: ' + time + 'ms');

    dbo.collection("reviewAwards").findOne({}, function (err, result) {
      if (err) throw err;
      let end = new Date();
      let time = end - startTime || 0;
      console.log('Running Query #2...');
      console.log('Query Time: ' + time + 'ms');
      db.close();
    });
  });
});








