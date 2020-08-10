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
display: block;
font-family: Arial, Helvetica, sans-serif;
color: #c6d4df;
background-color: #1b2838;
font-size: 12px;
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
          <span></span>
          <div>
            Most Helpful Reviews In The Past 30 Days
          </div>
          <div>
            <HelpfulReviews reviews={this.state.helpfulReviews}/>
          </div>
          <div>
            Recently Posted
          </div>
          <div>
            <RecentReviews reviews={this.state.recentReviews}/>
          </div>
      </Body>
    );
  }

}

export default Reviews;