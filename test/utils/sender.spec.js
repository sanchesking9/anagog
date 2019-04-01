const Sender = require('../../src/utils/sender');

describe('sender', function() {
  it('test report', function() {
    jest.useFakeTimers();

    const sender = new Sender([{
      visit: {},
      activity: {}
    }], {});

    sender.run();

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });
});
