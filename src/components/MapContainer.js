import React from 'react';
import {createConnector} from 'react-instantsearch';
import MapView from './MapView';

const MapContainer = createConnector({
  displayName: 'MapContainer',

  getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
    const [query, page] = searchState.queryAndPage || ['', 0];

    return {
      query,
      page,
      searchResults
    }
  }
})(props =>
  <div>
    Render map here
    <pre>{props.searchResults.results && JSON.stringify(props.searchResults.results.hits.map(x => x.venue && ('Lat ' + x.venue.lat + ', Lon ' + x.venue.lon)))}</pre>
    <MapView {...props} />
  </div>
);


export default MapContainer
