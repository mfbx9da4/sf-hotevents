import React from 'react';
import {createConnector} from 'react-instantsearch';
import MapView from './MapView';

const Element = props =>
  <div className="map">
    <MapView {...props} />
    <button onClick={() => props.refine('asdf', 0)}>jey</button>
  </div>


const Connector = {
  displayName: 'MapContainer',
  counter: 0,

  getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
    const [query, page] = searchState.queryAndPage || ['', 0];

    console.info('page', page, searchResults);
    // page from queryAndPage doesn't work!
    if (searchResults && searchResults.results && searchResults.results.hits) {
      const infinitePage = searchResults.results.page ? searchResults.results.page : 1
      console.info('infinitePage', infinitePage);
      const hits = searchResults.results.hits
      console.info('hits.length', hits.length);
      for (let i = 0; i < hits.length; i++) {
        let result = hits[i];
        let label = Connector.counter + 1
        if (!result.label) {
          result.label = label
          Connector.counter = label
        }
        if (result.label === 1) {
          result.isHovered = true
        }
      }
    }

    return {
      query,
      page,
      searchResults
    }
  },

  refine(props, searchState, newQuery, newPage) {
      // When the underlying component calls its `refine` prop, update the searchState
      // with the new query and page.
      console.info('called', arguments);
      return {
        // `searchState` represents the search state of *all* widgets. We need to extend it
        // instead of replacing it, otherwise other widgets will lose their
        // respective state.
        ...searchState,
        queryAndPage: [newQuery, newPage],
      };
    }
}

const MapContainer = createConnector(Connector)(Element);


export default MapContainer
