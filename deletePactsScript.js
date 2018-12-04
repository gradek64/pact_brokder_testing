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
      //    "delete:pact": "curl -X DELETE http://127.0.0.1:80/pacticipants/MyConsumer-Login"
      console.log('objectJSON.consumer.name',objectJSON.consumer.name);

      fs.createReadStream(currentPath,'utf8')
        .pipe(request.delete(host + path +'/pacticipants/'
          +objectJSON.consumer.name,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
          }
        },
        (error, response, body)=>{
          //console.log('response',response);
        }
        ));
    });
  });
});

