const request = require('request');
const fs = require('fs');
const path = require('path');
const host = 'http://127.0.0.1';
const PORT = 80;

fs.readdir( './pacts', ( err, files ) => {
  files.forEach( ( file ) => {
    let currentPath  = path.join(__dirname,'pacts', file);
    fs.readFile(currentPath,'utf8',(err,content)=>{
      let objectJSON = JSON.parse(content);
      fs.createReadStream(currentPath,'utf8')
        .pipe(request.put(host+':'+PORT+'/pacts/provider/'
          +objectJSON.provider.name+
          '/consumer/'
          +objectJSON.consumer.name+'/version/'+objectJSON.metadata.pactSpecification.version,(cb)=>{cb;}
        ));
    });
  });
});

