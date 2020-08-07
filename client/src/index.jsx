import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Reviews</h1>
      </div>
    );
  }

}

ReactDOM.render(<Reviews />, document.getElementById('reviews'));