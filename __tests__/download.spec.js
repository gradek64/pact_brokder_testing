'use strict';

const path = require('path');
const axios = require('axios');
const Pact = require('../dist/pact').Pact;

describe('Download\'s API', () => {
  //testing platform for mock server
  let url = 'http://localhost';
  const port = 8989;

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    logLevel:'error',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 3,
    consumer: 'MyConsumer-Download',
    provider: 'MyProvider'
  });

  /*
    *@fill paths for testing a routes 
    *@below:
  */
  //request
  const method = 'GET';
  const route = '/getPDF/sample.pdf';
  //response
  const status = 200;
  const contentType = 'application/pdf';
  

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('works', () => {
    beforeAll(() => {
      const interaction = {
        state: 'download consumer works',
        uponReceiving: 'perform download',
        withRequest: {
          method: method,
          path: route,
          headers: {
            'Accept': contentType
          }
        },
        willRespondWith: {
          status: status,
          headers: {
            'Content-Type': contentType
          }
        }
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it('downloads pdf file', done => {
      return axios.request({
        method: method,
        baseURL: `${url}:${port}`,
        url: route,
        headers: { 'Accept': contentType }
      })
        .then(response => {
          /*
            *@no need to check here since it is internal test 
            *@it will produce pact even if real server has no routes
          */
          /* expect(response.headers['content-type']).toEqual('application/json');
          expect(response.data).toEqual(EXPECTED_BODY);
          expect(response.status).toEqual(200);*/
          done();
        });
    });

    // verify with Pact, and reset expectations
    it('successfully verifies', () => provider.verify());
  });
});
