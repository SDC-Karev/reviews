import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

const url = '3.129.63.238';
// change to localhost when working locally
// also needs to be changed in Reviews

const ReviewBox = styled.div`
  background-color: rgba( 0, 0, 0, 0.2 );
  margin-bottom: 26px;
  background-image: url(https://store.cloudflare.steamstatic.com/public/images/v6/maincol_gradient_rule.png);
  background-repeat: no-repeat;
  background-position: top left;
  display: block;
`;

const ReviewLeftCol = styled.div`
  width: 184px;
  padding: 8px;
  opacity: 0.6;
  position: relative;
  display: inline-block;
  vertical-align: top;
`;

const ReviewRightCol = styled.div`
  width: 400px;
  position: relative;
  margin-left: 14px;
  display: inline-block;
  vertical-align: top;
`;

const Avatar = styled.div`
  float: left;
  padding-right: 8px;
  display: block;
`;

const AvatarImage = styled.img`
  background: linear-gradient( to bottom, #515151 5%, #474747 95%);
  width: 32px;
  height: 32px;
  padding: 1px;
  border-radius: 0;
  border: none;
`;

const Username = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
  overflow: hidden;
  margin-top: 0px;
  margin-bottom: -1px;
  display: inline-block;
  color: #c1dbf4;
  font-size: 13px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: bold;
`;

const OwnedGames = styled.div`
  font-size: 11px;
  color: #c1dbf4;
  display: block;
  line-height: 17px;
`;

const ReviewCount = styled.div`
  font-size: 11px;
  color: #c1dbf4;
  display: block;
`;

const ReviewHeader = styled.div`
  margin: 8px 0 13px;
  display: block;
  background: rgba( 0, 0, 0, 0.2 );
  height: 40px;
`;

const Thumb = styled.div`
  float: left;
  margin-right: 10px;
`;

const Source = styled.img`
  float: right;
  margin-right: 5px;
  margin-top: 12px;
  opacity: 0.5;
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Motiva Sans", Sans-serif;
`;
const Recommend = styled(Ellipsis)`
&&& {
  font-size: 16px;
  color: #d6d7d8;
  font-weight: normal;
  padding: 3px 0px 0px 0px;
  line-height: 19px;
}
`;

const Hours = styled(Ellipsis)`
&&& {
  font-weight: 300;
  font-size: 11px;
  line-height: 15px;
  color: #8091a2;
  opacity: 0.6;
}
`;

const PostedDate = styled.div`
  margin: 0px 0px 8px;
  font-size: 10px;
  text-transform: uppercase;
  font-style: normal;
  color: #8091a2;
  display: inline-block;
  opacity: 0.6;
`;

const Content = styled.div`
  margin-right: 8px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  color: #acb2b8;
  overflow-wrap: break-word;
  overflow: hidden;
`;

const Posted = styled.div`
  font-size: 10px;
  font-style: italic;
  color: #626366;
  margin: 0px;
`;

const ControlBlock = styled.div`
  margin: 8px 0;
  display: inline-block;
`;
const ControlBlockText = styled.span`
  display: inline-block;
  margin-right: 9px;
  color: #8091a2;
  font-size: 12px;
  opacity: 0.6;
`;

const VoteContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
`;

const Button = styled.a`
  border-radius: 2px;
  border: none;
  padding: 1px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: #66c0f4;
  background: #212c3d;
  margin-right: 5px;
  &:hover {
    color: #fff;
    background: #67c1f5;
  }
`;

const ButtonSpan = styled.span`
  padding: 0 5px;
  line-height: 20px;
`;

const Icon = styled.i`
  background: url(https://store.cloudflare.steamstatic.com/public/shared/images/buttons/icons_16.png?v=5);
  vertical-align: middle;
  display: inline-block;
  width: 16px;
  height: 16px;
`;

const ThumbsUp = styled(Icon)`
&&& {
  background-position: -112px -16px;
}
`;

const ThumbsDown = styled(Icon)`
&&& {
  background-position: -64px -16px;
}
`;

const Smiley = styled(Icon)`
&&& {
  background-position: -208px -16px;
}
`;

const Award = styled.img`
  vertical-align: middle;
  height: 16px;
  margin-right: 2px;
`;

const VoteInfo = styled.div`
  padding: 0px 9px 8px 0px;
  font-size: 12px;
  color: #647580;
  min-height: 16px;
`;

class HelpfulReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getAwards.bind(this);
  }

  componentDidMount() {
    this.getAwards();
  }

  getAwards() {
    const id = this.props.review.review_id;
    axios.get(`http://${url}:3004/api/awards/${id}`)
      .then((awardsResults) => {
        const awards = {};
        awardsResults.data.forEach((award) => {
          const key = award.name;
          const value = award['count(*)'];
          awards[key] = value;
        });
        this.setState(awards);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!this.props.review) {
      return <span>Loading...</span>;
    }
    let thumb;
    let recommended;
    const source = <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_review_steam.png'></img>;
    if (this.props.review.review_type === 0) {
      thumb = <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png' width='40' height='40'></img>;
      recommended = 'Recommended';
    } else {
      thumb = <img src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png' width='40' heigh='40'></img>;
      recommended = 'Not Recommended';
    }
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const reviewDate = months[Number(this.props.review.date.substring(5,7) - 1)] + ' ' + this.props.review.date.substring(8, 10);
    return (
      <ReviewBox>
        <ReviewLeftCol>
          <Avatar>
            <AvatarImage src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg'></AvatarImage>
          </Avatar>
          <Username>{this.props.review.name}</Username>
          <OwnedGames>{this.props.review.product_count} products in account</OwnedGames>
          <ReviewCount>{this.props.review.review_count} reviews</ReviewCount>
        </ReviewLeftCol>
        <ReviewRightCol>
          <ReviewHeader>
            <Thumb>{thumb}</Thumb>
            <Source src='https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_review_steam.png'></Source>
            <Recommend>{recommended}</Recommend>
            <Hours>{this.props.review.hrs_at_review} hrs on record ({this.props.review.hrs_on_record} hrs at review time)</Hours>
          </ReviewHeader>
          <PostedDate>Posted: {reviewDate}</PostedDate>
          <Content>{this.props.review.text}</Content>
          <Posted> ________________________________________________________________________  </Posted>
          <ControlBlock>
            <ControlBlockText>Was this review helpful?</ControlBlockText>
            <VoteContainer>
              <Button href='javascript:void(0)' onClick ={() => {console.log('hiyeeee!!!')}}>
                <ButtonSpan>
                  <ThumbsUp></ThumbsUp>
                  Yes
                </ButtonSpan>
              </Button>
              <Button href='javascript:void(0)' onClick ={() => {console.log('hiyeeee!!!')}}>
                <ButtonSpan>
                  <ThumbsDown></ThumbsDown>
                  No
                </ButtonSpan>
              </Button>
              <Button href='javascript:void(0)' onClick ={() => {console.log('hiyeeee!!!')}}>
                <ButtonSpan>
                  <Smiley></Smiley>
                  Funny
                </ButtonSpan>
              </Button>
              <Button href='javascript:void(0)' onClick ={() => {console.log('hiyeeee!!!')}}>
                <ButtonSpan>
                  <Award src='https://store.cloudflare.steamstatic.com/public/shared/images//award_icon.svg'></Award>
                   Award
                </ButtonSpan>
              </Button>
            </VoteContainer>
            <VoteInfo>
              {this.state.helpful || 0} people found this review helpful
              <br></br>
              {this.state.funny || 0} people found this review funny
            </VoteInfo>
          </ControlBlock>
        </ReviewRightCol>
      </ReviewBox>
    );
  }
}

export default HelpfulReview;
