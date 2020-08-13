import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const UserReviewsHeader = styled.h2`
font-family: "Motiva Sans", Sans-serif;
font-weight: 300;
font-size: 14px;
text-transform: uppercase;
color: #fff;
margin: 0 0 10px;
letter-spacing: 2px;
font-weight: normal;
padding-top: 2px;
`
;

const HeaderTop = styled.div`
  margin-bottom: 32px;
  border-top: 1px solid #000;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  color: #c6d4df;
  background-color: #1b2838;
  font-size: 12px;
  box-shadow: 0 0 5px #000;
  position: relative;
  padding: 10px 15px;
  background-color: #2a475e;
  margin-bottom: 3px;
`;

const ReviewSummaryBar = styled(HeaderTop)`
  &&& {
    padding: 0px;
    display: block;
  }
`
;

const OverallSummary = styled.div`
&&& {
  width: 65%;
  display: inline-block;
  padding: 0;
  margin: 0;
  box-shadow: 0 0 5px #000;
}
`;

const RecentSummary = styled(OverallSummary)`
&&& {
  width: 35%;
  background: rgba( 148, 217, 255, 0.2 );
}
`;

const SummarySection = styled.div`
  display: inline-block;
  margin-right: 15px;
  color: #8ba6b6;
  min-width: 320px;
  padding 10px;
`;

const SummaryTitle = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  font-size: 15px;
  margin-bottom: 5px;
  color: #e5e5e5;
  padding: 0;
  display: block;
`;

const SummaryTextPositive = styled.span`
  color: #66C0F4;
  cursor: help;
    font-family: "Motiva Sans", Sans-serif;
    font-weight: bold;
    font-size: 17px;
    line-height: 9px;
    text-shadow: 1px 1px rgba( 0, 0, 0, 0.2 );
`;

const SummaryTextMixed = styled.span`
  color: #a8926a;
  cursor: help;
    font-family: "Motiva Sans", Sans-serif;
    font-weight: bold;
    font-size: 17px;
    line-height: 9px;
    text-shadow: 1px 1px rgba( 0, 0, 0, 0.2 );
`;

const SummaryTextNegative = styled.span`
  color: #c35c2c;
  cursor: help;
    font-family: "Motiva Sans", Sans-serif;
    font-weight: bold;
    font-size: 17px;
    line-height: 9px;
    text-shadow: 1px 1px rgba( 0, 0, 0, 0.2 );
`;
const reviewSpan = styled.span`
  display: inline-block;
  margin-right: 15px;
  color: #8ba6b6;
  min-width: 320px;
  position: relative;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    if(this.props.reviewCount === undefined || this.props.recentReviewCount === undefined || this.props.reviewSentiment === undefined || this.props.recentReviewSentiment === undefined) {
      console.log('loading');
      return <span>Loading...</span>;
    } else {
      var count = this.props.reviewCount[0][`count(*)`];
      var recentCount = this.props.recentReviewCount[0][`count(*)`];
      var reviewSentiment = this.props.reviewSentiment[0][`count(*)`] / (this.props.reviewSentiment[0][`count(*)`] + this.props.reviewSentiment[1][`count(*)`]);
      console.log(reviewSentiment);
      var recentReviewSentiment = this.props.recentReviewSentiment[0][`count(*)`] / (this.props.recentReviewSentiment[0][`count(*)`] + this.props.recentReviewSentiment[1][`count(*)`]);
      console.log(reviewSentiment);
      console.log(recentReviewSentiment);
      let summary;
      if (reviewSentiment < .75) {
        summary = <SummaryTextNegative>Mostly Negative</SummaryTextNegative>;
      } else {
        summary = <SummaryTextPositive>Mostly Positive</SummaryTextPositive>
      }

      return(
        <div>
        <UserReviewsHeader>Customer Reviews</UserReviewsHeader>
          <HeaderTop>
          </HeaderTop>
            <ReviewSummaryBar>
              <OverallSummary>
                <SummarySection>
                  <SummaryTitle>Overall Reviews:</SummaryTitle>
                  {summary}
                  {/* <SummaryTextPositive>Mostly Positive</SummaryTextPositive> */}
                  <span> ({count || `loading`} reviews)</span>
                </SummarySection>
              </OverallSummary>
              <RecentSummary>
                <SummarySection>
                  <SummaryTitle>Recent Reviews:</SummaryTitle>
                  <SummaryTextPositive>Mostly Positive</SummaryTextPositive>
                  <span> ({recentCount} reviews)</span>
                </SummarySection>
              </RecentSummary>
            </ReviewSummaryBar>
        </div>
      );
    }
  }

}

export default Header;