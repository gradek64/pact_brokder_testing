const {
  Verifier
} = require('../../../dist/pact');
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const axios = require('axios');
const {
  VerifierOptions
} = require('@pact-foundation/pact-node');
chai.use(chaiAsPromised);
const {
  server,
  importData,
  animalRepository
} = require('./provider.js');

server.post('/setup', (req, res) => {
  const state = req.body.state;

  console.log('req.body.state', req.body.state);

  animalRepository.clear();
  switch (state) {
  case 'Has no animals':
    // do nothing
    break;
  default:
    importData();
  }

  res.end();
});

server.listen(8081, () => {
  console.log('Animal Profile Service listening on http://localhost:8081');
});

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  const providerName = 'MyProvider';
  let pacts = [];
  const pactBrokerUrl = 'http://localhost';
  const providerBaseUrl = '/pacts/provider/'+providerName;

  /*
      *@request all the files for provider
      *@notice that provider name is the same for all pacts...
  */
  //http://localhost/pacts/provider/MyProvider
  it(`retrieves all pacts from given provider: ${providerName}`, done => {
    return axios.request({
      method: 'GET',
      baseURL: pactBrokerUrl,
      url: providerBaseUrl
    })
      .then(response => { 
        pacts = response.data._links.pacts.map(pact=> pact.href);
        done();
      });
  });


  it('should validate the expectations of Matching Service', done => { // lexical binding required here
    //this.timeout(10000);

    let opts = {
      provider: 'Animal Profile Service',
      providerBaseUrl: 'http://localhost:8081',
      providerStatesSetupUrl: 'http://localhost:8081/setup',
      // Fetch pacts from broker
      //pactBrokerUrl: 'https://test.pact.dius.com.au/',
      pactUrls: pacts,

      // Fetch from broker with given tags
      tags: ['prod', 'sit5'],
      // Specific Remote pacts (doesn't need to be a broker)
      // pactFilesOrDirs: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
      // Local pacts
      // pactFilesOrDirs: [path.resolve(process.cwd(), './pacts/matching_service-animal_profile_service.json')],
      //pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
      //pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      customProviderHeaders: ['Authorization: basic e5e5e5e5e5e5e5']
    };

    return new Verifier().verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!');
        console.log(output);
        done();
      });
  });
});
