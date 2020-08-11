import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

const ReviewBoxShort = styled.div`
  opacity: 0.9;
  background: linear-gradient(to right,
    rgba(34,50,70,1) -1%,
    rgba(34,50,70,1) 0%,
    rgba(34,50,70,0) 92%,
    rgba(34,50,70,0) 100%);
    margin-bottom: 26px;
  display: block;
`;

const ShortReviewHeader = styled.div`
  height: 24px;
  color: #819db8;
  background-color: rgba( 0, 0, 0, 0.3 );
  margin-bottom: 6px;
  display: block;
  line-height: 15px;
`;

const Thumb = styled.div`
  display: block;
  float: left;
`;

const Username = styled(ShortReviewHeader)`
&&& {
  max-width: 120px;
  height: 19px;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
  margin-left: 6px;
  float: left;
}
`;

const Source = styled.div`
  float: right;
  margin-right: 5px;
  margin-top: 4px;
  opacity: 0.5;
`;

const Hours = styled(Username)`
&&& {
  opacity: 0.5
}
`;

const ShortBox = styled(ReviewBoxShort)`
&&& {
  padding-left: 8px;
}
`;

const PostedDate = styled.div`
  color: #8091a2;
  text-transform: uppercase;
  font-size: 10px;
  opacity: 0.5;
  margin: 0px 0px 8px;
  font-style: normal;
  display: inline-block;
`;

const Content = styled.div`
  margin-right: 8px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  color: ##9fb4c9;
  display: block;
  overflow-wrap: break-word;
  overflow: hidden;
`;

class RecentReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.review) {
      return <span>Loading...</span>
    }
    let thumb;
    let source = <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_review_steam.png'></img>;
    if (this.props.review.review_type === 1) {
      thumb = <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png' width='24' height='24'></img>
    } else {
      thumb = <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png' width='24' heigh='24'></img>
    }
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let reviewDate = months[Number(this.props.review.date.substring(5,7)) + 1] + ' ' + this.props.review.date.substring(8, 10);

    return (
      <ReviewBoxShort>
        <ShortReviewHeader>
          <Source>{source}</Source>
          <Thumb>{thumb}</Thumb>
          <Username>{this.props.review.name}</Username>
          <Hours>{this.props.review.hrs_at_review} hrs</Hours>
        </ShortReviewHeader>
        <ShortBox>
          <PostedDate> Posted: {reviewDate}</PostedDate>
          <Content>{this.props.review.text}</Content>
        </ShortBox>
      </ReviewBoxShort>
    )
  }
}

export default RecentReview;