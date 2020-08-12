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

const ReviewSummary = styled.span`
  cursor: help;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: bold;
  color: #66C0F4;
`;

class FilterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <FilterInfoContainer>
        {/* <div>
          <FiltersTitle>Filters</FiltersTitle>
        </div> */}
        <FilterScore>
          <div>
            <span>
              Showing <b>10</b> reviews that match the filters above (
            </span>

              <ReviewSummary> Mostly Positive </ReviewSummary>
             )
          </div>
        </FilterScore>

      </FilterInfoContainer>
    )
  }
}

export default FilterDetails;