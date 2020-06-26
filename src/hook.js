import React, { useEffect, useContext } from 'react';
import { store, options } from './store';
import queueRequest from './fetcher';

/**
 * useRequest
 * @param query
 * @param key
 * @param extractor
 * @returns {*}
 */
const useRequest = ({ query, key = window.location.pathname, extractor, queryOptions = {}}) => {

    const { dispatch, state } = useContext(store);

    useEffect(() => {
        if (queryOptions.forceFetch) queueRequest(dispatch, key, query, extractor, queryOptions);
        if (!state[key]) queueRequest(dispatch, key, query, extractor, queryOptions);
        if (state[key] && options.debug)
            console.log(`-- graphql-request ${key} found in cache!`);
    }, [query]);

    return state[key];
};

export default useRequest;
