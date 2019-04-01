const Http = require('./http');

const http = new Http();

class Sender {
  constructor(clients, options) {
    this.clients = clients;
    this.intervals = [];

    const defaultOptions = {
      interval: 500
    };

    this.options = Object.assign({}, defaultOptions, options);
  }

  * getClient(client) {
    let i = 0;
    while (true) {
      if (i >= client.length) return;

      i++;
      yield client[i-1];
    }
  }

  send(endpoint, data = {}) {
    http.post(endpoint, data);
  }

  run() {
    this.clients.forEach((client, k) => {
      const clientGen = this.getClient(client);

      this.intervals[k] = setInterval(() => {
        const { value, done } = clientGen.next();

        if (done) return clearInterval(this.intervals[k]);

        if (value.visit) {
          this.send('/api/visit/v1/', { data: value.visit });
        }

        if (value.activity) {
          this.send('/api/activity/v1/', { data: value.activity });
        }
      }, this.options.interval);
    });
  }
}

module.exports = Sender;
