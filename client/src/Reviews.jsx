import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import HelpfulReviews from './HelpfulReviews.jsx';
import RecentReviews from './RecentReviews.jsx';
import Header from './Header.jsx';
import FilterBar from './FilterBar.jsx';
import FilterDetails from './FilterDetails.jsx';

// const gameId = 9;
// const url = '3.129.63.238';
const url = 'localhost';
// change to localhost when working locally

const Body = styled.div`
width: 940px;
margin: 0 auto;
display: block;
font-family: Arial, Helvetica, sans-serif;
color: #c6d4df;
background-color: #1b2838;
font-size: 12px;
position: relative;
float: left;
`;

const LeftCol = styled(Body)`
 &&& {
  width: 616px;
  float: left;
 }
`;

const RightCol = styled(Body)`
 &&& {
  width: 308px;
  margin-left: 14px;
  float: right;
 }
`;

const ReviewsSubHeader = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  padding-bottom: 5px;
  letter-spacing: 2px;
`;

const SubHeaderDays = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  color: #56707f;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameId: -1 };
    this.getHelpfulReviews.bind(this);
    this.getRecentReviews.bind(this);
    this.getReviewCount.bind(this);
    this.getRecentReviewCount.bind(this);
    this.getReviewSentiment.bind(this);
    this.getRecentReviewSentiment.bind(this);
  }

  setGameId() {
    const idPath = window.location.pathname;
    const urlID = idPath.match(/\d+/);

    // gets the gameid from url, defaults to 5000 if not found
    if (urlID) {
      var newID = urlID[0];
    } else {
      var newID = '5000';
    }
    newID = Number.parseInt(newID, 10);
    this.setState({ gameId: newID });
  }

  componentDidMount() {
    this.setGameId();
    this.getHelpfulReviews();
    this.getRecentReviews();
    this.getReviewCount();
    this.getRecentReviewCount();
    this.getReviewSentiment();
    this.getRecentReviewSentiment();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameId !== this.state.gameId) {
      this.getHelpfulReviews();
      this.getRecentReviews();
      this.getReviewCount();
      this.getRecentReviewCount();
      this.getReviewSentiment();
      this.getRecentReviewSentiment();
    }
  }



  getHelpfulReviews() {
    axios.get(`http://${url}:3004/api/helpfulReviews/${this.state.gameId}`)
      .then((helpfulReviews) => {
        this.setState({ helpfulReviews: helpfulReviews.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecentReviews() {
    axios.get(`http://${url}:3004/api/recentReviews/${this.state.gameId}`)
      .then((recentReviews) => {
        this.setState({ recentReviews: recentReviews.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewCount() {
    axios.get(`http://${url}:3004/api/reviewCount/${this.state.gameId}`)
      .then((count) => {
        this.setState({ reviewCount: count.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecentReviewCount() {
    axios.get(`http://${url}:3004/api/recentReviewCount/${this.state.gameId}`)
      .then((count) => {
        this.setState({ recentReviewCount: count.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewSentiment() {
    axios.get(`http://${url}:3004/api/reviewSentiment/${this.state.gameId}`)
      .then((sentiment) => {
        if (!sentiment.data[0]) {
          sentiment.data = [{"review_type": 0, "count(*)": 0}, {"review_type": 1, "count(*)": 0}];
        }
        if (!sentiment.data[1]) {
          sentiment.data[1] = { "review_type": 1, "count(*)": 0 };
        }

        const revSent = sentiment.data[0][`count(*)`] / (sentiment.data[0][`count(*)`] + sentiment.data[1][`count(*)`]);
        const revSentPct = (Math.floor(revSent * 100)) + '%';
        this.setState({ reviewSentiment: revSent, percent: revSentPct });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecentReviewSentiment() {
    axios.get(`http://${url}:3004/api/recentReviewSentiment/${this.state.gameId}`)
      .then((sentiment) => {
        if (!sentiment.data[0]) {
          sentiment.data = [{ "review_type": 0, "count(*)": 0 }, { "review_type": 1, "count(*)": 0 }];
        }
        if (!sentiment.data[1]) {
          sentiment.data[1] = { "review_type": 1, "count(*)": 0 };
        }
        const recRevSent = sentiment.data[0][`count(*)`] / (sentiment.data[0][`count(*)`] + sentiment.data[1][`count(*)`]);
        const recRevSentPct = (Math.floor(recRevSent * 100)) + '%';
        this.setState({ recentReviewSentiment: recRevSent, recentPercent: recRevSentPct });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Body>
          <Header reviewCount={this.state.reviewCount} recentReviewCount={this.state.recentReviewCount} reviewSentiment={this.state.reviewSentiment} recentReviewSentiment={this.state.recentReviewSentiment} reviewPercent ={this.state.percent} recPercent ={this.state.recentPercent}/>
          <FilterBar />
          <FilterDetails reviewCount={this.state.reviewCount} reviewSentiment={this.state.reviewSentiment} reviewPercent={this.state.percent}/>
          <LeftCol>
            <ReviewsSubHeader>
              Most Helpful Reviews
              <SubHeaderDays> in the past 30 days</SubHeaderDays>
            </ReviewsSubHeader>
            <div>
              <HelpfulReviews reviews={this.state.helpfulReviews}/>
            </div>
          </LeftCol>
        <RightCol>
          <ReviewsSubHeader>
            Recently Posted
          </ReviewsSubHeader>
          <div>
            <RecentReviews reviews={this.state.recentReviews}/>
          </div>
        </RightCol>
      </Body>
    );
  }
}

export default Reviews;
