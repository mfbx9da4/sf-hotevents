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
  <div className="map">
    <MapView {...props} />
  </div>
);


export default MapContainer
