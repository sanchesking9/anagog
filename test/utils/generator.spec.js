const uuid = require('uuid');
const Generator = require('../../src/utils/generator');

describe('generating test data', function() {
  let gen = null;

  beforeEach(() => {
    gen = new Generator({ userId: uuid.v4() }).getData();
  });

  it('test report', function() {
    let step = gen.next().value;

    expect(step.visit).toMatchObject({ EnterTime: 1553558400000, ExitTime: 1553560800000 }); // Tuesday, 26 March 2019 г., 0:00:00 - 0:40:00
    expect(step.activity).toMatchObject({ StartTime: 1553562000000, EndTime: 1553563800000 }); // Tuesday, 26 March 2019 г., 1:00:00 - 1:30:00

    step = gen.next().value;

    expect(step.visit).toMatchObject({ EnterTime: 1553565600000, ExitTime: 1553568000000 }); // Tuesday, 26 March 2019 г., 2:00:00 - 2:40:00
    expect(step.activity).toMatchObject({ StartTime: 1553569200000, EndTime: 1553571000000 }); // Tuesday, 26 March 2019 г., 3:00:00 - 3:30:00

  });
});
