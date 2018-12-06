const request = require('request');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const credentials = require('dotenv').load();
const providerName = 'MyProvider';
const username = credentials.parsed.USERNAME.toString();
const password = credentials.parsed.PASSWORD.toString();
let auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
/*
  *@for localhost publicPort = false
  *@for dius publicPort = true;
*/
const publicPort = false;
const host = publicPort ? 'https://nttdata.pact.dius.com.au': 'http://127.0.0.1';
const PORT = 80;
let pathURL = publicPort?'':':'+PORT;
const pactBrokerUrl = host + pathURL;
const providerBaseUrl = '/pacts/provider/'+providerName;


//delete pacts on pact broker;
axios.request({
  method: 'GET',
  headers:{
    Authorization:auth,
  },
  baseURL: pactBrokerUrl,
  url: providerBaseUrl
})
  .then(response => response.data._links.pacts.map(pact=> pact.name))
  .then(pacts => {
    pacts.forEach(consumerName => {
      
      //delete remote pacts
      request.delete(host +'/pacticipants/'+consumerName,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
          }
        },
        (error, response, body)=>{
          //console.log('response',response);
        });

      //delete local pacts as well 
      fs.readdir( './pacts', ( err, files ) => {
        files.forEach( ( file ) => {
          const filePath = path.join(__dirname,'pacts',file);
          fs.unlink(filePath,()=> console.log('pact removed'));
        });
      });

    }
    );
  });

