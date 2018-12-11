const {
  Verifier
} = require('../../dist/pact');
const axios = require('axios');
//vars to update per provider
const providerName = 'MyProvider';
let pactsFromPactBroker = [];
const credentials = require('dotenv').load();
const username = credentials.parsed.USERNAME.toString();
const password = credentials.parsed.PASSWORD.toString();
let auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
/*
  *@publicPort = false for pact broker localhost 
  *@publicPort = true for pact broker dius
*/
const publicPort = true;

//pact broker
const pactBroker_PORT = 80;
let pathURL = publicPort?'':':'+pactBroker_PORT;
const host = publicPort ? 'https://nttdata.pact.dius.com.au': 'http://127.0.0.1';
const pactBrokerUrl = host + pathURL;
const providerBaseUrl = '/pacts/provider/'+providerName;

//server
const serverUrl = publicPort ? 'https://pact-test-greg.herokuapp.com': 'http://127.0.0.1:8080';

//this is only need if data needs setup with database
/*server.post('/setups', (req, res) => {
  console.log('....state.....',req);
  const state = req.body.state;

  animalRepository.clear();
  switch (state) {
  case 'Has no animals':
    // do nothing
    break;
  default:
    importData();
  }

  res.end();
});*/

/*server.listen(8081, () => {
  console.log('Localhost Provider listening on http://localhost:8081');
});*/

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  const runPact = () => {
  //it('should validate the expectations of Matching Service', done => { // lexical binding required here
    //allow spare time for sever to connect;

    console.log('pactsFromPactBroker',pactsFromPactBroker);
    let opts = {
      provider: providerName,
      //providerBaseUrl: 'http://localhost:8081',
      /*
        *@below based on file
        *@api-pact-workshop-real-API/server/expressServer
      */
      providerBaseUrl: serverUrl,
      //providerStatesSetupUrl: 'http://localhost:8081/setup',
      // Fetch pacts from broker
      //pactBrokerUrl: 'http://127.0.0.1',
      //pactBrokerUrl: 'https://nttdata.pact.dius.com.au/',
      pactUrls: pactsFromPactBroker,
      // Fetch from broker with given tags
      tags: ['prod', 'sit5'],
      // Specific Remote pacts (doesn't need to be a broker)
      // pactFilesOrDirs: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
      // Local pacts
      // pactFilesOrDirs: [path.resolve(process.cwd(), './pacts/matching_service-animal_profile_service.json')],
      pactBrokerUsername: '7PE1BDrw97hD7fMoPEIvuRFXyCXeR',
      pactBrokerPassword: 'pUxiGbo3h7wc3w2NWmlFyLVYlEo3nCn',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      customProviderHeaders: ['Authorization: basic e5e5e5e5e5e5e5']
    };
    new Verifier().verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!');
        console.log(output);
      });
  //});
  };

  /*
      *@request all the files for provider
      *@notice that provider name is the same for all pacts...
  */
  //http://localhost/pacts/provider/MyProvider
  it(`retrieves all pacts from given provider: ${providerName}`, done => {
    return axios.request({
      method: 'GET',
      headers:{
        Authorization:auth,
      },
      baseURL: pactBrokerUrl,
      url: providerBaseUrl
    })
      .then(response => { 
        pactsFromPactBroker = response.data._links.pacts.map(pact=> pact.href);
        done();
        runPact();
      });
  });

  
});
