let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
  providerBaseUrl: 'http://localhost:8080',
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'https://localhost:80',
  pactBrokerUsername: 'greg',
  pactBrokerPassword: 'greg',
  consumerVersion: '2.0.0'
};

publisher.publishPacts(opts).then(() => done());


