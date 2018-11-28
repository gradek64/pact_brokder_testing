
//testingPlatform means how many pacts to generate for which field
/*
      f.e login, data-plan will generate pact as below
      viderpro-'Name'-consumer-'Name'-test-login
      provider-'Name'-consumer-'Name'-test-data-plan
  */

process.env.CONSUMER = 'consumerName';
process.env.PROVIDER = 'providerName';
process.env.TESTS_FOR = ['login','data-plan','process-card'];
