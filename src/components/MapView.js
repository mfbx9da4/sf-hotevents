import React, { Component } from 'react';
import './MapView.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import data from "../data/latsAndLons.json";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
  >
  {console.log('child',props.children)}
  {
    props.children[1] && props.children[1].map(function(event, i){
      console.log("event", event);
      let percent = 0.7
      if(event.venue){
        return <Marker key={i}
        label={event.percent_full + '%'}
        opacity={event.percent}
        position={{ lat: event.venue.lat, lng: event.venue.lon }} />
      }
    })
  }
  </GoogleMap>
));


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
    console.log("props ", this.props)
    const {loading, msg} = this.state;
    const hits = this.props.searchResults && this.props.searchResults.results && this.props.searchResults.results.hits
    return <div>
      <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}>
      hits={hits}
      </MapWithAMarker>
    </div>
  }
}

export default MapView;
