var axios = require('axios');
var expect = require('chai').expect;

describe('API calls', () => {
  it('should return recent reviews for a game when game ID is passed in', (done) => {
    axios.get('http://localhost:3004/api/recentReviews/8')
      .then((res) => {
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        expect(res.data).to.exist;
        var record = res.data[0];
        expect(record.id).to.exist;
        expect(record.date).to.exist;
        expect(record.text).to.exist;
        expect(record.name).to.exist;
        expect(record.review_type).to.exist;
        expect(record.hrs_at_review).to.exist;
        done();
      })
      .catch((err) => {
        expect(err).to.not.exist;
      });
  });

  it('should return most helpful reviews for a game when game ID is passed in', (done) => {
    axios.get('http://localhost:3004/api/helpfulReviews/25')
      .then((res) => {
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        expect(res.data).to.exist;
        var record = res.data[0];
        expect(record.review_id).to.exist;
        expect(record['count(*)']).to.exist;
        expect(record.name).to.exist;
        expect(record.date).to.exist;
        expect(record.text).to.exist;
        expect(record.review_type).to.exist;
        expect(record.product_count).to.exist;
        expect(record.review_count).to.exist;
        expect(record.hrs_on_record).to.exist;
        expect(record.hrs_at_review).to.exist;
        expect(res.data.length < 11).to.be.true;
        done();
      })
      .catch((err) => {
        expect(err).to.not.exist;
      });
  });

  it('should return awards for a review when a review Id is passed in', (done) => {
    axios.post('http://localhost:3004/api/awards', {
      "id": 8
    })
      .then((res) => {
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        expect(res.data).to.exist;
        var record = res.data[0];
        expect(record.award_id).to.equal(1);
        expect(record['count(*)']).to.exist;
        expect(record.name).to.equal('helpful');
        done();
      })
      .catch((err) => {
        expect(err).to.not.exist;
        done();
      });
  });
});