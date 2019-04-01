const axios = require('axios');
const zlib = require('zlib');

class Http {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      headers: {
        'content-encoding': 'gzip',
        'content-type': 'application/json'
      }
    });

    return this;
  }

  post(...args) {
    const [endpoint, data] = args;

    zlib.gzip(JSON.stringify(data), (err, result) => {
      return this.http.post(endpoint, result);
    });

  }
}

module.exports = Http;
