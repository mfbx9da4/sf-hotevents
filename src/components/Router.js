import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import App from './App';
import TimeView from './TimeView';
import MapView from './MapView';

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">List</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li>
        <Link to="/timeline">Timeline</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={App} />
      <Route path="/map" component={MapView} />
      <Route path="/timeline" component={TimeView}/>
    </div>
  </Router>
);

export default AppRouter;
