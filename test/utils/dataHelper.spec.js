const rewire = require('rewire');
const helper = rewire('../../src/utils/dataHelper');


describe('data helper', function() {
  it('getRandRange', function() {
    const getRandArray = helper.__get__('getRandArray');

    const mockGetRandRange = jest.fn(() => 5);

    helper.__set__('getRandRange', mockGetRandRange);

    expect(getRandArray([0, 2, 4, 6, 8, 10])).toEqual(10);
  });

  it('getAlgorithmType', function() {
    let mockGetRandRange = null;

    mockGetRandRange = jest.fn(() => 0);
    helper.__set__('getRandRange', mockGetRandRange);
    expect(helper.getAlgorithmType()).toBe(1);

    mockGetRandRange = jest.fn(() => 6);
    helper.__set__('getRandRange', mockGetRandRange);
    expect(helper.getAlgorithmType()).toBe(7);

    mockGetRandRange = jest.fn(() => 7);
    helper.__set__('getRandRange', mockGetRandRange);
    expect(helper.getAlgorithmType()).toBeUndefined();
  });

  it('getActivityType', function() {
    let mockGetRandRange = null;

    [1,2,4,8,16,32].forEach((v, k) => {
      mockGetRandRange = jest.fn(() => k);
      helper.__set__('getRandRange', mockGetRandRange);
      expect(helper.getActivityType()).toBe(v);
    });

    mockGetRandRange = jest.fn(() => 6);
    helper.__set__('getRandRange', mockGetRandRange);
    expect(helper.getActivityType()).toBeUndefined();
  });
});
