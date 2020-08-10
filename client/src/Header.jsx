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

const SummaryText = styled.span`
  color: #66C0F4;
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

function Header(props) {
  return(
    <div>
    <UserReviewsHeader>Customer Reviews</UserReviewsHeader>
      <HeaderTop>
      </HeaderTop>
        <ReviewSummaryBar>
          <OverallSummary>
            <SummarySection>
              <SummaryTitle>Overall Reviews:</SummaryTitle>
              <SummaryText>Mostly Positive</SummaryText>
              <span> (10 reviews)</span>
            </SummarySection>
          </OverallSummary>
          <RecentSummary>
            <SummarySection>
              <SummaryTitle>Recent Reviews:</SummaryTitle>
              <SummaryText>Mostly Positive</SummaryText>
              <span> (10 reviews)</span>
            </SummarySection>
          </RecentSummary>
        </ReviewSummaryBar>
    </div>
  );
}

export default Header;