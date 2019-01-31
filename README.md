
XTrade Web is an Angular web frontend application to manage XTrade Server. 
It is a web UI Admin console application.

Application features list is in [Readme.pdf](https://github.com/sergiovision/XTradeWeb/blob/master/Readme.pdf) file in root folder.

How to build/run:
1) npm install
2) Edit the following file:

\node_modules\jszip\lib\Readable-stream-browser.js

comment line: // module.exports = require("stream");

3) npm install 
4) to run website execute the following command: ng serve 


5) for production build edit base host url in this file [/src/assets/config.json](https://github.com/sergiovision/XTradeWeb/blob/master/src/assets/config.json) 

  "baseURL.Prod": "http://host_name:2013",
  
  "baseURL.Dev": "http://localhost:2013",

To build production version run command

ng build --prod --aot --no-progress

6) copy generated dist/* folder with all contents to XTradeServer_root/ folder
In this case application will be self hosted by XTrade server windows service


Link to main server application repository: [XTradeServer](https://github.com/sergiovision/XTradeServer)

