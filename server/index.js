require('newrelic');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const db = require('../database');
const pg = require('../database/pgIndex.js');

const app = express();
const port = 3004;
app.use(cors());

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// const allowlist = ['http://localhost:3000', 'http://18.191.56.232:3000/'];
// const corsOptionsDelegate = function(req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true };
//   } else {
//     corsOptions = { origin: false };
//   }
//   callback(null, corsOptions);
// }

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(bodyParser.json());
// UNCOMMENT FOR REACT
// app.use('/:gameId', express.static(__dirname + '/../client/dist'));
app.use(express.static(`${__dirname}/../client/dist`));


// cors(corsOptions),
app.get('/api/recentReviews/:id', (req, res) => {
  const gameId = req.params.id;
  // MySQL Handler
  // db.getRecentReviews(gameId)
  //   .then((reviews) => {
  //     res.send(reviews);
  //     res.end();
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //     res.end();
  //   });

  // Postgres Handler
  pg.getRecentReviews(gameId, (err, data) => {
    if (err) {
      re.send('An error has ocurred fetching recent reviews');
    } else {
      res.send(data.rows);
    }
  });
});

app.post('/api/recentReviews/:id', (req, res) => {
  const gameId = req.params.id;
  const b = req.body;
  const args = [gameId, b.authorId, b.date, b.text, b.reviewType, b.hrsAtReview, b.purchaseType, b.lang, b.earlyAccess];

  db.postRecentReviews(...args)
    .then((result) => {
      res.send('Added review');
    })
    .catch((err) => {
      res.send('something went wrong, could not post new review')
    });
});

app.put('/api/recentReviews/:id', (req, res) => {
  const gameId = req.params.id;
  const b = req.body;
  const args = [gameId, b.authorId, b.date, b.text, b.reviewType, b.hrsAtReview, b.purchaseType, b.lang, b.earlyAccess, b.id];

  db.updateReview(...args)
    .then((result) => {
      res.send('updated review')
    })
    .catch((err) => {
      res.send('could not update review')
    })
})

app.delete('/api/recentReviews/:id', (req, res) => {
  const reviewId = req.body.id;
  db.deleteReview(reviewId)
    .then((success) => {
      res.send('deleted a review');
    })
    .catch((err) => {
      res.send('could not delete review');
    });
});


app.get('/api/helpfulReviews/:id', (req, res) => {
  const gameId = req.params.id;

  // MySQL Handler
  // db.getHelpfulReviews(gameId)
  //   .then((reviews) => {
  //     res.send(reviews);
  //     res.end();
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //     res.end();
  //   });

  // Postgres Handler
  pg.getHelpfulReviews(gameId, (err, data) => {
    if (err) {
      res.send('Error getting awards')
    } else {
      res.send(data.rows);
    }
  })
});

app.get('/api/reviewCount/:id', (req, res) => {
  const gameId = req.params.id;
//   db.getReviewCount(gameId)
//     .then((count) => {
//       res.send(count);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });

  pg.getReviewCount(gameId)
    .then((count) => {
      res.send(count.rows);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/recentReviewCount/:id', (req, res) => {
  const gameId = req.params.id;
//   db.getRecentReviewCount(gameId)
//     .then((count) => {
//       res.send(count);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
  pg.getRecentReviewCount(gameId)
    .then((count) => {
      res.send(count.rows);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/reviewSentiment/:id', (req, res) => {
  const gameId = req.params.id;
  // db.getReviewSentiment(gameId)
  //   .then((sentiment) => {
  //     res.send(sentiment);
  //     res.end();
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //     res.end();
  //   });

    pg.getReviewSentiment(gameId)
    .then((sentiment) => {
      res.send(sentiment.rows);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/recentReviewSentiment/:id', (req, res) => {
  const gameId = req.params.id;
  // db.getRecentReviewSentiment(gameId)
  //   .then((sentiment) => {
  //     res.send(sentiment);
  //     res.end();
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //     res.end();
  //   });

  pg.getRecentReviewSentiment(gameId)
    .then((sentiment) => {
      res.send(sentiment.rows);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

app.get('/api/awards/:id', (req, res) => {
  const reviewId = req.params.id;
  // db.getAwards(reviewId)
  //   .then((awards) => {
  //     res.send(awards);
  //     res.end();
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //     res.end();
  //   });
  pg.getAwards(reviewId, (err, data) => {
    if (err) {
      res.send('Error getting awards')
    } else {
      res.send(data.rows);
    }
  })
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
