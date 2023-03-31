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

export async function getEcho(message: string)
{
  let fetched: object;
  const fetching: Promise<void> = fetch("https://postman-echo.com/get?"+message)
    .then(
      response => response.json()
    ).then((result) => {
      fetched = {
        'echo': result,
        'env': process.env.VERSION,
        'timestamp':  Date.now(),
        'version': LIB_VERSION
      };
    }
  ).catch(() =>{
    fetched = {
      'error': 'echo service is down'
    };
  });

  fetching.then().then(() => {
    return fetched;
  });
}

app.post('/', async (req, res) => {
  const message:string = encodeURIComponent(req.query.message);
  // TODO: promise doesn't want to resolve before accessing
  // res.send(ll);
});

app.listen(port, () => {
  console.log("Service v"+LIB_VERSION+" listening on port "+port+"!");
});
