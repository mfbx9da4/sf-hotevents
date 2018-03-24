import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import './ListView.css';
import config from 'config'

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, msg: null};
  }

  handleClick = (e) => {
    e.preventDefault();
    // do stuff
  }

  render() {
    const {loading, msg} = this.state;

    return <p>
      <InstantSearch
        appId="latency"
        apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
        indexName="bestbuy"
      >
        {/* Search widgets will go there */}
      </InstantSearch>
    </p>
  }
}

export default ListView;
