const uuid = require('uuid');
const config = require('config');
const Generator = require('../../utils/generator');
const Sender = require('../../utils/sender');

const getDailyReport = function({ userId }) {
  const gen = new Generator({ userId }).getData();

  const partitionsPerDay = 12;
  const result = [];
  let i = 0;
  let index = 0;

  for (const step of gen ) {
    if (!result[index]) {
      result[index] = { visit: [], activity: [] };
    }

    result[index].visit.push(step.visit);
    result[index].activity.push(step.activity);
    i++;

    if (i >= partitionsPerDay) {
      i = 0;
      index++;
    }
  }
  return result;
};

function view(req, res) {
  const usersCount = config.get('client.usersCount');
  const clients = [];

  for (let i=0; i < usersCount; i++) {
    const client = getDailyReport({ userId: uuid.v4() });
    clients.push(client);
  }

  const sender = new Sender(clients, {});
  sender.run();

  res.render('client/view', { title: 'Client', clients: clients });
}

module.exports = view;
