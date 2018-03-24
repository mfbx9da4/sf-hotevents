import React, { Component } from 'react';
import './MapView.css';

class MapView extends Component {
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
      Map
    </p>
  }
}

export default MapView;
