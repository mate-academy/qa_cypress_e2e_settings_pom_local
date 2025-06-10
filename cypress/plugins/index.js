/*eslint-disable*/
const axios = require('axios');

module.exports = (on, config) => {
  on('task', {
    'db:clear': async () => {
      await axios.post('http://localhost:3000/api/test/reset-db');
      return null;
    }
  });
};
