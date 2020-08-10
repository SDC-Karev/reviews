import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HelpfulReviews from './HelpfulReviews.jsx';
import RecentReviews from './RecentReviews.jsx';

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
      <div>
        <h4>Customer Reviews</h4>
        <div>
          <h5>Overall Reviews:</h5>
          <h5>Mostly Positive (Insert Number Here Reviews)</h5>
        </div>
        <span></span>
        <div>
          <h5>Recent Reviews:</h5>
          <h5>Mostly Positive</h5>
        </div>
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

      </div>
    );
  }

}

export default Reviews;