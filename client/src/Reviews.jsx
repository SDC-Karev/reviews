import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import HelpfulReviews from './HelpfulReviews.jsx';
import RecentReviews from './RecentReviews.jsx';
import Header from './Header.jsx';

const Body = styled.div`
margin-bottom: 32px;
border-top: 1px solid #000;
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
  }

  componentDidMount() {
    this.getHelpfulReviews();
    this.getRecentReviews();
  }

  getHelpfulReviews() {
    axios.get('api/helpfulReviews/1')
    .then((helpfulReviews) => {
      this.setState({helpfulReviews: helpfulReviews.data});
    })
  }

  getRecentReviews() {
    axios.get('api/recentReviews/1')
    .then((recentReviews) => {
      this.setState({recentReviews: recentReviews.data});
    })
  }

  render() {
    return (
      <Body>
          <Header />
          <div>Reviews Filter Bar</div>
          <div>Reviews Summary</div>
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