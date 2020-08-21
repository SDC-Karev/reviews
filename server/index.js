const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 3004;

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
const allowlist = ['http://localhost:3000', 'http://http://18.191.56.232:3000/'];
const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(bodyParser.json());
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/recentReviews/:id', cors(corsOptionsDelegate), (req, res) => {
  const gameId = req.params.id;
  db.getRecentReviews(gameId)
    .then((reviews) => {
      res.send(reviews);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/helpfulReviews/:id', cors(corsOptionsDelegate), (req, res) => {
  const gameId = req.params.id;
  db.getHelpfulReviews(gameId)
    .then((reviews) => {
      res.send(reviews);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/reviewCount/:id', cors(corsOptionsDelegate), (req, res) => {
  const gameId = req.params.id;
  db.getReviewCount(gameId)
    .then((count) => {
      res.send(count);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/recentReviewCount/:id', cors(corsOptionsDelegate), (req, res) => {
  const gameId = req.params.id;
  db.getRecentReviewCount(gameId)
    .then((count) => {
      res.send(count);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/reviewSentiment/:id', cors(corsOptionsDelegate), (req, res) => {
  const gameId = req.params.id;
  db.getReviewSentiment(gameId)
    .then((sentiment) => {
      res.send(sentiment);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/recentReviewSentiment/:id', cors(corsOptionsDelegate), (req, res) => {
  const gameId = req.params.id;
  db.getRecentReviewSentiment(gameId)
    .then((sentiment) => {
      res.send(sentiment);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/awards/:id', cors(corsOptionsDelegate), (req, res) => {
  const reviewId = req.params.id;
  db.getAwards(reviewId)
    .then((awards) => {
      res.send(awards);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

// app.get('/api/allReviews', cors(corsOptions), (req, res) => {
//   db.getAllReviews(1)
//     .then((reviews) => {
//         reviews.forEach((review) => {
//           review.awards = {};
//           db.getAwards(review.id)
//           .then((awards) => {
//             return awards.forEach((award) => {
//                 review.awards[award.name] = award[`count(*)`];
//               })
//           })
//         })
//         console.log(reviews);
//         return reviews;
//     })
//     .then((reviews) => {
//       res.send(reviews);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
//   });
