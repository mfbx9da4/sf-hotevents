import React, { Component } from 'react';
import './App.css';
import LambdaDemo from './lambdaDemo';

function Product({ hit }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <span className="hit-name">
        <Highlight attribute="name" hit={hit} />
        <div>{hit.local_date}</div>
      </span>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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