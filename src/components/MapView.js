import React, { Component } from 'react';
import './MapView.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
  >

  {
    props.children[1] && props.children[1].map(function(event, i){
      // console.log("event", event);

      if(event.venue){
        return <Marker key={i}
        opacity={event.percent}
        position={{ lat: event.venue.lat, lng: event.venue.lon }} />
      } else {
      	return undefined;
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
    const hits = this.props.searchResults && this.props.searchResults.results && this.props.searchResults.results.hits
    return <div>
      <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtfDkcrjaVzct57ejFVmfixWq7-2Glg4A&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `500px` }} />}
      mapElement={<div style={{ height: `100%` }} />}>
      hits={hits}
      </MapWithAMarker>
    </div>
  }
}

export default MapView;
