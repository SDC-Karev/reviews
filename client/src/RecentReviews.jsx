import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RecentReview from './RecentReview.jsx'

class RecentReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  // }

  render() {
    if (!this.props.reviews) {
      return <span>Loading...</span>
    }
    return(
      <div className='right-col recent_reviews'>
        {this.props.reviews.map((review) => {
          return (
            <RecentReview review={review}/>
          )
        })}
      </div>
    );
  }
}

  export default RecentReviews;