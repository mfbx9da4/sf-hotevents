import React, { Component } from 'react';
import './App.css';
import { InstantSearch, Hits, Highlight, SearchBox } from 'react-instantsearch/dom';
import MapContainer from './MapContainer';

class App extends Component {
  render() {
	function HitItem(hit) {
		return (
			<div className='hit-item'>
				<Highlight className='title' attribute="name" hit={hit} />

				<div className='hit-name-sub'>
					{(hit.percent_full) ? <span className="hit-name-sub-capacity">Capacity {hit.percent_full}% </span> : <span className="hit-name-sub-capacity">Capacity</span> }
					<span className="hit-name-sub-attendance">Going {hit.yes_rsvp_count} </span>
					<span className="hit-name-sub-date">{hit.local_date} {hit.local_time} </span>
				</div>
			</div>
		);
	}

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
				<SearchBox/>

				<MapContainer/>

				<div className="container">
					<Hits hitComponent={HitItem} />
				</div>
			</InstantSearch>
		</div>
	);
  }
}

export default App;
