import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import HelpfulReviews from './HelpfulReviews.jsx';
import RecentReviews from './RecentReviews.jsx';
import Header from './Header.jsx';
import FilterBar from './FilterBar.jsx';
import FilterDetails from './FilterDetails.jsx';

const gameId = 9;
const url = '3.129.63.238';
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
    this.state = {};
    this.getHelpfulReviews.bind(this);
    this.getRecentReviews.bind(this);
    this.getReviewCount.bind(this);
    this.getRecentReviewCount.bind(this);
    this.getReviewSentiment.bind(this);
    this.getRecentReviewSentiment.bind(this);
  }

  componentDidMount() {
    this.getHelpfulReviews();
    this.getRecentReviews();
    this.getReviewCount();
    this.getRecentReviewCount();
    this.getReviewSentiment();
    this.getRecentReviewSentiment();
  }

  getHelpfulReviews() {
    axios.get(`http://${url}:3004/api/helpfulReviews/${gameId}`)
      .then((helpfulReviews) => {
        this.setState({ helpfulReviews: helpfulReviews.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecentReviews() {
    axios.get(`http://${url}:3004/api/recentReviews/${gameId}`)
      .then((recentReviews) => {
        this.setState({ recentReviews: recentReviews.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewCount() {
    axios.get(`http://${url}:3004/api/reviewCount/${gameId}`)
      .then((count) => {
        this.setState({ reviewCount: count.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecentReviewCount() {
    axios.get(`http://${url}:3004/api/recentReviewCount/${gameId}`)
      .then((count) => {
        this.setState({ recentReviewCount: count.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewSentiment() {
    axios.get(`http://${url}:3004/api/reviewSentiment/${gameId}`)
      .then((sentiment) => {
        const revSent = sentiment.data[0][`count(*)`] / (sentiment.data[0][`count(*)`] + sentiment.data[1][`count(*)`]);
        const revSentPct = (Math.floor(revSent * 100)) + '%';
        this.setState({ reviewSentiment: revSent, percent: revSentPct });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecentReviewSentiment() {
    axios.get(`http://${url}:3004/api/recentReviewSentiment/${gameId}`)
      .then((sentiment) => {
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
