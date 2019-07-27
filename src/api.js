import axios from 'axios';

export default (uri) => {
  return axios.get(uri)
  .then(response => {
    return response.data.results;
  })
  .catch(error => {
    throw error.message;
  });
}