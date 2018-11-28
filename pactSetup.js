const path = require('path');
const Pact = require('../../dist/pact').Pact;
const testArray = process.env.TESTS_FOR.split(',');
const testName = testArray[process.env.TEST_INDEX++];
const providerName = process.env.PROVIDER;
const consumerName = process.env.CONSUMER ;


global.port = 8991;
global.provider = new Pact({
  port: global.port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'cons-'+ consumerName +'-t-'+ testName,
  provider: 'prov-'+ providerName
});
