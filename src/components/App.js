import React, { Component } from 'react';
import './App.css';
import { InstantSearch, Hits, InfiniteHits, Highlight, SearchBox } from 'react-instantsearch/dom';
import MapContainer from './MapContainer';
import moment from 'moment';

function timeDifference(date, time) {
  const day = moment(date).format('ddd, MMM Do,')
	return  `${day} ${moment(time).format("h:mma")}`;
}


class App extends Component {
  setIsHovered = (hit) => {
    console.info('was called', hit);
  }

  hitItem = ({ hit }) => {
    return (
      <div className='hit-item' onClick={this.setIsHovered.bind(this, hit)}>
        <div>
          <span style={{fontSize: '1.3rem'}}>{hit.label} </span>
          <a href={hit.link} target='_blank'>
            <Highlight className='title' attribute="name" hit={hit} />
          </a>
        </div>

        <div className='hit-name-sub'>
          {(hit.percent_full) ? <span className="hit-name-sub-capacity">Capacity {hit.percent_full}% </span> : <span className="hit-name-sub-capacity">Capacity N/A</span> }
          <span className="hit-name-sub-attendance">Going {hit.yes_rsvp_count} </span>
          <span className="hit-name-sub-date">{timeDifference(hit.local_date, hit.time)} </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SF Hot Events</h1>
        </header>

        <InstantSearch
          appId="8AOQAW9EZA"
          apiKey="8caaee2531c0957918fc460b01e2acbb"
          indexName="sf-events"
        >
          <SearchBox />
          <div className="container">
            <MapContainer />
            <InfiniteHits hitComponent={this.hitItem} className="events-list"/>
          </div>
        </InstantSearch>
      </div>
    );
  }
}

export default App;
