import axios from 'axios';

const host = 'https://front-test.beta.aviasales.ru';

export default {
  getSearchId: () => axios.get(`${host}/search`).then((response) => response.data),
  getTickets: (searchId) => axios.get(`${host}/tickets`, { params: searchId }).then((response) => response.data),
};
