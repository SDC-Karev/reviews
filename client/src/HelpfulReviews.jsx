import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import HelpfulReview from './HelpfulReview.jsx'

class HelpfulReviews extends React.Component {
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
      <div>
        {this.props.reviews.map((review, i) => {
          return (
            <HelpfulReview review={review} key={i}/>
          )
        })}
      </div>
    );
  }
}

  export default HelpfulReviews;