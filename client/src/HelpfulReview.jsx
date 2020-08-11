import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// const Recommendation = styled.div`
//   font-size: 16px;
//   color: #d6d7d8;
//   font-family: "Motiva Sans", Sans-serif;
//   font-weight: normal;
//   padding: 3px 0px 0px 0px;
//   line-height: 19px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;

class HelpfulReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.review) {
      return <span>Loading...</span>
    }
    // let thumb;
    // let rec;
    // if (this.props.review.review_type === 1) {
    //   thumb = <div>
    //             <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png' width='24' height='24'></img>
    //           </div>;
    //   rec = <Recommendation>Recommended</Recommendation>;
    // } else {
    //   thumb = <div>
    //             <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png' width='24' heigh='24'></img>
    //           </div>;
    //   rec = <Recommendation>Not Recommended</Recommendation>;
    // }
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