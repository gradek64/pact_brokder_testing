const request = require('request');
const fs = require('fs');
const path = require('path');
/*
  *@publicPort = false for pact broker localhost 
  *@publicPort = true for pact broker dius
*/
const publicPort = true;
const host = publicPort ? 'https://nttdata.pact.dius.com.au': 'http://127.0.0.1';
const PORT = 80;


fs.readdir( './pacts', ( err, files ) => {
  files.forEach( ( file ) => {
    let currentPath  = path.join(__dirname,'pacts', file);
    fs.readFile(currentPath,'utf8',(err,content)=>{
      let objectJSON = JSON.parse(content);
      let path = publicPort?'':':'+PORT;
      const username = '7PE1BDrw97hD7fMoPEIvuRFXyCXeR';
      const password = 'pUxiGbo3h7wc3w2NWmlFyLVYlEo3nCn';
      let auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

      fs.createReadStream(currentPath,'utf8')
        .pipe(request.put(host + path +'/pacts/provider/'
          +objectJSON.provider.name+
          '/consumer/'
          +objectJSON.consumer.name+'/version/'+objectJSON.metadata.pactSpecification.version,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
          }
        },
        (error, response, body)=>{
          if(error) console.log('\x1b[31m','upps error ;)',error); 
          console.log('\x1b[0m','published:'+file);
        }
        ));
    });
  });
});

