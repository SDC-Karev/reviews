import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import HelpfulReviews from './HelpfulReviews.jsx';
import RecentReviews from './RecentReviews.jsx';
import Header from './Header.jsx';
import FilterBar from './FilterBar.jsx'
import FilterDetails from './FilterDetails.jsx'

let gameId = 3;

const Body = styled.div`
margin-bottom: 32px;
width: 940px;
margin: 0 auto;
display: block;
font-family: Arial, Helvetica, sans-serif;
color: #c6d4df;
background-color: #1b2838;
font-size: 12px;
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
    axios.get(`api/helpfulReviews/${gameId}`)
    .then((helpfulReviews) => {
      this.setState({helpfulReviews: helpfulReviews.data});
    })
  }

  getRecentReviews() {
    axios.get(`api/recentReviews/${gameId}`)
    .then((recentReviews) => {
      this.setState({recentReviews: recentReviews.data});
    })
  }

  getReviewCount() {
    axios.get(`api/reviewCount/${gameId}`)
    .then((count) => {
      this.setState({reviewCount: count.data});
    })
  }

  getRecentReviewCount() {
    axios.get(`api/recentReviewCount/${gameId}`)
    .then((count) => {
      this.setState({recentReviewCount: count.data});
    })
  }

  getReviewSentiment() {
    axios.get(`api/reviewSentiment/${gameId}`)
    .then((sentiment) => {
      let revSent = sentiment.data[0][`count(*)`] / (sentiment.data[0][`count(*)`] + sentiment.data[1][`count(*)`]);
      this.setState({reviewSentiment: revSent});
    })
  }

  getRecentReviewSentiment() {
    axios.get(`api/recentReviewSentiment/${gameId}`)
    .then((sentiment) => {
      let recRevSent = sentiment.data[0][`count(*)`] / (sentiment.data[0][`count(*)`] + sentiment.data[1][`count(*)`]);
      this.setState({recentReviewSentiment: recRevSent});
    })
  }

  render() {
    return (
      <Body>
          <Header reviewCount={this.state.reviewCount} recentReviewCount={this.state.recentReviewCount} reviewSentiment={this.state.reviewSentiment} recentReviewSentiment={this.state.recentReviewSentiment}/>
          <FilterBar />
          <FilterDetails reviewCount={this.state.reviewCount} reviewSentiment={this.state.reviewSentiment}/>
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