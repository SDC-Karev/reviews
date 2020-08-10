import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RecentReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.review) {
      return <span>Loading...</span>
    }
    return (
      <div>
        <div id='recent-header'>
          <div id='recent-username'>
            {this.props.review.name}
          </div>
          <div id ='recent-hours'>
            {this.props.review.hrs_at_review} hrs
          </div>
        </div>
        <div id='recent-body'>
          <div id='recent-date'>
            Posted: {this.props.review.date.substring(0,10)}
          </div>
          <div id='recent-text'>
            {this.props.review.text}
          </div>
        </div>
      </div>
    )
  }
}

export default RecentReview;