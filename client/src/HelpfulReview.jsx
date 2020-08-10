import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class HelpfulReview extends React.Component {
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
        <div>
          <div className='left-col'>
            <div>
              {this.props.review.name}
            </div>
            <div>
            {this.props.review.product_count}  products in account {'\n'}
            {this.props.review.review_count} reviews
            </div>
          </div>
          <div className='right-col'>
            <div>
              Posted: {this.props.review.date.substring(0,10)}
            </div>
            <div>
              {this.props.review.text}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default HelpfulReview;