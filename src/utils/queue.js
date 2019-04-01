const Kafka = require('node-rdkafka');
const config = require('config');

class Producer {
  constructor() {
    const producer = new Kafka.Producer({
      'metadata.broker.list': config.get('kafka.host')
    });

    this.producer = producer;
  }

  connect() {
    return this.producer.connect();
  }

  produce(...args) {
    return this.producer.produce(...args);
  }

  on(event, cb) {
    this.producer.on(event, cb);
  }
}

class Consumer {
  constructor() {
    const consumer = new Kafka.KafkaConsumer({
      'group.id': 'kafka',
      'metadata.broker.list': config.get('kafka.host'),
    }, {});

    this.consumer = consumer;
    return this;
  }

  connect() {
    this.consumer.connect();
    return this;
  }

  subscribe(...args) {
    this.consumer.subscribe(...args);
    return this;
  }

  consume(...args) {
    this.consumer.consume(...args);
    return this;
  }

  on(event, cb) {
    this.consumer.on(event, cb);
    return this;
  }
}

module.exports = {
  Producer,
  Consumer
};
