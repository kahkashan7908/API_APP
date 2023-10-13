const axios = require('axios');

async function fetchData(req, res) {
    // Logic for fetching data
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const data = response.data;
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  }

  module.exports = {
    fetchData,
  };