import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './App'
import TimeView from './TimeView'
import MapView from './MapView'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">List</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={App}/>
      <Route path="/map" component={MapView}/>
      <Route path="/timeline" component={TimeView}/>
    </div>
  </Router>
)
export default AppRouter
