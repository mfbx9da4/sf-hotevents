import React, { Component } from 'react';
import {createConnector} from 'react-instantsearch';

/**
 * This file provides a reference for how to implement any type of widget
 *
 */

const CoolWidget = createConnector({
  displayName: 'CoolWidget',

  getProvidedProps(props, searchState, searchResults, meta, searchForFacetValuesResults) {
    // Since the `queryAndPage` searchState entry isn't necessarily defined, we need
    // to default its value.
    const [query, page] = searchState.queryAndPage || ['', 0];

    console.info('searchResults', searchResults.results);

    // Connect the underlying component to the `queryAndPage` searchState entry.
    return {
      query,
      page,
      searchResults
    }
  },

  refine(props, searchState, newQuery, newPage) {
    // When the underlying component calls its `refine` prop, update the searchState
    // with the new query and page.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their
      // respective state.
      ...searchState,
      queryAndPage: [newQuery, newPage],
    };
  },
})(props =>
  <div>
    <pre>{props.searchResults.results && JSON.stringify(props.searchResults.results.hits.map(x => x.venue && ('Lat ' + x.venue.lat + ', Lon ' + x.venue.lon)))}</pre>
    The query is {props.query}, the page is {props.page}.
    {/*
      Clicking on this button will update the searchState to:
      {
        ...otherSearchState,
        query: 'algolia',
        page: 20,
      }
    */}
    <button onClick={() => props.refine('algolia', 20)} />
    {/*
      Clicking on this button will update the searchState to:
      {
        ...otherSearchState,
        query: 'instantsearch',
        page: 15,
      }
    */}
    <button onClick={() => props.refine('instantsearch', 15)} />
  </div>
);


export default CoolWidget
