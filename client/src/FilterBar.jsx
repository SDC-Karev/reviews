import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';

const Bar = styled.div`
  padding: 0px;
  font-size: 12px;
  margin-bottom: 30px;
  background-color: #1f2f42;
  width: 100%;
  height: 30px;
`;

const MenuItem = styled.div`
  border-left: 1px solid #2a475e;
  position: relative;
  float: left;
  padding-right: 10px;
}
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 10px;
  color: #4582a5;
  padding: 10px;
  padding-right: 20px;
  cursor: pointer;
  background-image: url(https://store.cloudflare.steamstatic.com/public/images/v6/btn_arrow_down_padded.png);
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: right;
`;

const FlyOut = styled.div`
  position: absolute;
  display: none;
  padding: 10px;
  color: #556772;
  line-height: 20px;
  z-index: 10;
`;

const FlyOutContent = styled.div`
  position: relative;
  white-space: nowrap;
`;

const FilterInput = styled.input`
  vertical-align: text-top;
`;

const FilterLabel = styled.label`
  cursor: default;
`;

const FilterCount = styled.span`
  color: #7193a6;
`;

const DisplayAs = styled.div`
  float: left;
  text-transform: uppercase;
  font-size: 10px;
  color: #4582a5;
  padding: 5px 10px 5px 10px;
  border-left: 1px solid #2a475e;
`;

const DisplayAsSelect = styled.select`
  width: 100px;
  background: #4582a5;
  font-size: 12px;
  border: none;
  border-radius: 2px;
  margin-left: 5px;
  margin-top: 2px;
`;

const GraphButtonContainer = styled.div`
  float: right;
`;

const GraphButton = styled.span`
  display: inherit;
  border-radius: 2px;
  border: none;
  padding: 1px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: #67c1f5;
  background: rgba( 103, 193, 245, 0.2 );
`;

const ShowGraph = styled.span`
  display: inline;
  padding: 0 5px;
  font-size: 12px;
  line-height: 20px;
`;

const GraphButtonIcon = styled.div`
  width: 14px;
  height: 16px;
  margin-right: 7px;
  margin-top: 4px;
  background: url(https://store.cloudflare.steamstatic.com/public/images/v6/app/review_graph_expander.png);
  background-repeat: no-repeat;
  background-size: 14px 26px;
  display: inline-block;
  background-position: 0px -12px;
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
        <Bar>
          <MenuItem>
            <Title>Review Type</Title>
            {/* <FlyOut>
              <FlyOutContent>
                <FilterInput type='radio' name='review_type' value = 'all' checked onChange={()=> {console.log('picked a new filter');}}></FilterInput>
                <FilterLabel>All
                  <FilterCount>`(10)`</FilterCount>
                </FilterLabel>s
              </FlyOutContent>
            </FlyOut> */}
          </MenuItem>
          <MenuItem>
            <Title>Purchase Type</Title>
          </MenuItem>
          <MenuItem>
            <Title>Language</Title>
          </MenuItem>
          <MenuItem>
            <Title>Date Range</Title>
          </MenuItem>
          <MenuItem>
            <Title>Playtime</Title>
          </MenuItem>
          <DisplayAs>
            <span>Display As:</span>
            <DisplayAsSelect>
              <option value='summary'>Summary</option>
              <option value='summary'>Most Helfpul</option>
              <option value='summary'>Recent</option>
              <option value='summary'>Funny</option>
            </DisplayAsSelect>
          </DisplayAs>
          <GraphButtonContainer>
            <GraphButton>
              <ShowGraph>Show graph</ShowGraph>
              <GraphButtonIcon></GraphButtonIcon>
            </GraphButton>
          </GraphButtonContainer>
        </Bar>
    )
  }
}

export default FilterBar;