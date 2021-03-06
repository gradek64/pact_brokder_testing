# Jest Example

1. In the pact-js project root, change to the `examples/jest` directory
1. Run: `npm i`
1. Run the tests: `npm t`

## Comments about Jest
You will need to run jest '[in band](https://facebook.github.io/jest/docs/en/cli.html#runinband)' as it will cause state issues otherwise. If you are running a large unit test suite you'll probably want to run that separately as a result to take advantage of the concurrency of jest (it is quite a slow down). To achieve this you can get your pact tests to have a suffix of '.pact.js' and add the following to your pact task in npm:
```
--testRegex \"/*(.test.pact.js)\""
```

Also the examples have set up a global 'provider' variable using the 'pactSetup.js' file. Then the pactTestWrapper.js ensures each test file will have the provider setup for them. The beforeAll and afterAll in jest is not before all tests but before each file. I had to put the
```
pactfileWriteMode: 'update'
```
in the provider to get pacts appended to.

Also note the publish is a separate task. As there is no real afterAll it is difficult to know when to publish in normal running so I had to extract it.


-------- Instalation on Windows- --------
1. Install node.js 
2. Install git
3. clone this repository
4. Install Ruby 2.5.* with DevKIT 
5. Then install ruby gem for Pact:....:  `gem i json pact-mock_service`
6. run `npm install` in this directory;

------- The order of executing test-----
  
  /* U do need pact dius credentials for point from 2-4 below*/

1. `npm run test:consumer` !! remember to turn off your wifi for this test due to mock-server connecting issue if flags problem!!
2. `npm run publish:pact`  !!turn your wifi back on is connecting to dius!!
3. `npm run test:provider`  !!turn your wifi back on is connecting to dius!!
4. `npm run deleteBunch:pact`  --deletes all pacts from dius for provider !!turn your wifi back on is connecting to dius!!


