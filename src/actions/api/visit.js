const Queue = require('../../utils/queue');

function visit(req, res) {
  const topic = 'Visit';

  try {
    const producer = new Queue.Producer();

    producer.connect();

    producer.on('ready', () => {
      producer.produce(topic, null, Buffer.from(JSON.stringify(req.body.data)));
    });

  } catch (err) {
    console.log('Error: ', err );
  }

  res.send('Visit: ok');
}

module.exports = visit;
