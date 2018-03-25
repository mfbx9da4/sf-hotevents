import React, { Component } from 'react';
import {createConnector} from 'react-instantsearch';
import MapView from './MapView';

const MapContainer = createConnector({
  displayName: 'MapContainer',

  getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
    const [query, page] = searchState.queryAndPage || ['', 0];
    console.info('searchResults', searchResults.results);
    return {
      query,
      page,
      searchResults
    }
  }
})(props =>
  <div>
    <MapView {...props} />
  </div>
);


export default MapContainer
