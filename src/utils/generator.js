const config = require('config');
const {
  getRandLatitude,
  getRandLongitude,
  getActivityType,
  getAlgorithmType,
  getPoiId
} = require('./dataHelper');

const init = {
  visit: {
    startTime: new Date(`${config.get('client.initDate')}T00:00:00+0000`).getTime(),
    endTimeOffset: 40 * 60 * 1000, // 40 minutes
  },
  activity: {
    startTime: new Date(`${config.get('client.initDate')}T01:00:00+0000`).getTime(),
    endTimeOffset: 30 * 60 * 1000, // 30 minutes
  }
};

class BaseGen {
  constructor(startTime, endTimeOffset) {
    this.startTime = startTime;
    this.endTimeOffset = endTimeOffset;
    this.finalTime = new Date().getTime();
    this.offset = 0;
  }
  * getTime() {
    const ref = this;

    while(true) {
      if (ref.startTime >= ref.finalTime) return;

      ref.startTime = ref.startTime + ref.offset;
      ref.endTime = ref.startTime + ref.endTimeOffset;
      ref.offset = 2 * 60 * 60 * 1000; // 2 hours

      yield {
        startTime: ref.startTime,
        endTime: ref.endTime
      }
    }
  }
}

class Generator {
  constructor({ userId }) {
    this.userId = userId;
  }

  * getData() {
    const visitGen = this.getVisit();
    const activityGen = this.getActivity();

    while (true) {
      const visit = visitGen.next();
      const activity = activityGen.next();

      if (visit.done && activity.done) return;

      yield {
        visit:    !visit.done ? { userId: this.userId, ...visit.value } : null,
        activity: !activity.done ? { userId: this.userId, ...activity.value } : null
      }
    }
  }

  * getVisit() {
    const timeGen = new BaseGen(init.visit.startTime, init.visit.endTimeOffset).getTime();

    while(true) {
      const time = timeGen.next();

      if (time.done) return;

      yield {
        "DataVer":       1,
        "EnterTime":     time.value.startTime,
        "ExitTime":      time.value.endTime,
        "AlgorithmType": getAlgorithmType(),
        "PoiId":         getPoiId(),
        "Latitude":      getRandLatitude(),
        "Longitude":     getRandLongitude()
      };
    }
  }

  * getActivity() {
    const timeGen = new BaseGen(init.activity.startTime, init.activity.endTimeOffset).getTime();

    while(true) {
      const time = timeGen.next();

      if (time.done) return;

      yield {
        "DataVer":        1,
        "ActivityType":   getActivityType(),
        "StartTime":      time.value.startTime,
        "EndTime":        time.value.endTime,
        "StartLatitude":  getRandLatitude(),
        "StartLongitude": getRandLongitude(),
        "EndLatitude":    getRandLatitude(),
        "EndLongitude":   getRandLongitude()
      };
    }
  }
}

module.exports = Generator;
