const request = require('supertest');
const app = require('../../../app');

describe('routes: api/activity', () => {
  it('should respond as expected', async () => {
    const response = await request(app)
      .post('/api/activity/v1')
      .send({ data: {} });
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});
