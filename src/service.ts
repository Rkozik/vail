import express from 'express';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { LIB_VERSION } from './version.js';

const app: express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path:__dirname+'/./../../.env'});

const port = process.env.PORT;

// function getEcho(message:string){
//
// }

app.post('/', (req, res) => {
  const message:string = encodeURIComponent(req.query.message);

  fetch("https://postman-echo.com/get?"+message)
    .then(
      response => response.json()
    ).then((result) => {
      res.send({
        'echo': result,
        'env': process.env.VERSION,
        'timestamp':  Date.now(),
        'version': LIB_VERSION
      });
    }
  );

});

app.listen(port, () => {
  console.log("Service v"+LIB_VERSION+" listening on port "+port+"!");
});
