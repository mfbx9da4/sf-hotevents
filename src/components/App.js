import React, { Component } from 'react';
import './App.css';
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch/dom';
import Product from './Product';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <InstantSearch
          appId="8AOQAW9EZA"
          apiKey="8caaee2531c0957918fc460b01e2acbb"
          indexName="sf-events"
        >
          <SearchBox />
          <div className="container">
            <Hits hitComponent={Product} />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

export default App;