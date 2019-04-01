const config = require('config');
const fs = require('fs');
const Queue = require('../src/utils/queue');

class DecoupledDataCollector {
  constructor(topic, options) {
    this.options = Object.assign({}, {
      messageCount: config.get('ddc.messageCount'),
      interval: config.get('ddc.interval'),
      partition: config.get('ddc.partition')
    }, options);

    this.topic = topic;
    this.consumer = new Queue.Consumer();
    this.consumer.connect();
    this.data = [];
  }

  subscribe() {
    this.consumer
      .on('ready', () => {
        this.consumer.subscribe([this.topic]);

        setInterval(() => {
          this.swapDataToFile();
          this.consumer.consume(this.options.messageCount);
        }, this.options.interval);
      })
      .on('data', (data) => {
        this.data.push(JSON.parse(data.value.toString()));
        if (this.data.length >= this.options.partition) {
          this.swapDataToFile();
        }
      });
  }

  swapDataToFile() {
    if (this.data.length === 0) return;
    const keepData = [...this.data];
    this.data = [];
    const fileName = `public/data/${this.topic}-${Date.now()}.json`;
    fs.writeFile(fileName, JSON.stringify(keepData, '', 2), 'utf8', () => {
      console.log(`File ${fileName} saved`);
    });
  }
}

const visitDataCollector = new DecoupledDataCollector('Visit');
const activityDataCollector = new DecoupledDataCollector('Activity');

visitDataCollector.subscribe();
activityDataCollector.subscribe();
