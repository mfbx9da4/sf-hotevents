import React, { Component } from 'react';
import './TimeView.css';

class TimeView extends Component {
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
      Timeline
    </p>
  }
}

export default TimeView;