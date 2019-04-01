const request = require('supertest');
const app = require('../../../app');

describe('routes: client/view', () => {
  it('should respond as expected', async () => {
    const response = await request(app).get('/client');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});
