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
  {
    data.map(function(event, i){
      return <Marker key={i} position={{ lat: event.lat, lng: event.lon }} />
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
<<<<<<< HEAD
    const {loading, msg} = this.state;
    return <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}>
      </MapWithAMarker>
=======
    return <p>
      Map
    </p>
>>>>>>> a66a39bc02fabbe3a4eb296793fd3ef1fda98330
  }
}

export default MapView;
