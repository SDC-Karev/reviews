import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

const FilterInfoContainer = styled.div`
  border-bottom: 1px solid #000;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const FiltersTitle = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  text-transform: none;
  font-size: 15px;
  color: #c6d4df;
  padding-bottom: 5px;
  display: inline-block;
  margin-right: 5px;
`;

const FilterScore = styled.div`
  display: block;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  padding-top: 10px;
  font-size: 15px;
`;

const SummaryTextPositive = styled.span`
  color: #66C0F4;
  cursor: help;
    font-family: "Motiva Sans", Sans-serif;
    font-weight: bold;
`;

const SummaryTextMixed = styled.span`
  color: #a8926a;
  cursor: help;
    font-family: "Motiva Sans", Sans-serif;
    font-weight: bold;
`;

const SummaryTextNegative = styled.span`
  color: #c35c2c;
  cursor: help;
    font-family: "Motiva Sans", Sans-serif;
    font-weight: bold;
`;

class FilterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    if(this.props.reviewCount === undefined) {
      return <span>Loading...</span>;
    } else {
      var count = this.props.reviewCount[0][`count(*)`];
    }
    var reviewSentiment = this.props.reviewSentiment;
    let summary;
      if (reviewSentiment < .65) {
        summary = <SummaryTextNegative>Overwhelmingly Negative</SummaryTextNegative>;
      } else if (reviewSentiment >= .65 && reviewSentiment < .68) {
        summary = <SummaryTextNegative>Mostly Negative</SummaryTextNegative>;
      } else if (reviewSentiment >= .68 && reviewSentiment < .72) {
        summary = <SummaryTextMixed>Mixed</SummaryTextMixed>;
      } else if (reviewSentiment >= .72 && reviewSentiment < .75) {
        summary = <SummaryTextPositive>Mostly Positive</SummaryTextPositive>;
      } else {
        summary = <SummaryTextPositive>Overwhelmingly Positive</SummaryTextPositive>;
      }
    return (
      <FilterInfoContainer>
        <FilterScore>
          <div>
            <span>
              Showing <b>{count}</b> reviews that match the filters above (
            </span>
            {summary}
             )
          </div>
        </FilterScore>

      </FilterInfoContainer>
    )
  }
}

export default FilterDetails;