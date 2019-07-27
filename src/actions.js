import { FETCHING_DATA } from './constants';

export const fetchData = (uri) => {
  return {
    type: FETCHING_DATA,
    uri,
  }
}