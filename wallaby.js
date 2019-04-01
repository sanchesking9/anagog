module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      'routes/**/*.js',
      'views/**/*.pug',
      'config/**/*.json',
      'jest.config.js',
      'app.js'
    ],

    tests: [
      'test/**/*.spec.js'
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },

    testFramework: 'jest',

    setup: function (wallaby) {
      const jestConfig = require('./jest.config.js');
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
