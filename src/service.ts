import express from 'express';

const app: express = express();
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path:__dirname+'/./../../.env'});

const port = process.env.PORT;


app.post('/', (req, res) => {
  const message:string = encodeURIComponent(req.query.message);

  fetch("https://postman-echo.com/get?"+message)
    .then(
      response => response.json() // .json(), .blob(), etc.
    ).then((result) => {
      res.send({
        'echo': result,
        'env': process.env.VERSION,
        'timestamp':  Date.now()
      });
    }
  );
});

app.listen(port, () => {
  console.log("Service listening on port "+port+"!");
});
