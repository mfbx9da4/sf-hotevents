import React, { Component } from 'react';
import './App.css';
import LambdaDemo from './lambdaDemo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <LambdaDemo/>
      </div>
    );
  }
}

export default App;