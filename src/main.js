import Dotenv from 'dotenv';
Dotenv.config();
import cors from '@koa/cors';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import fs from 'fs';
import https from 'https';
import api from './api/index.js';

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();
let corsOptions = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
};
app.proxy = true;
app.use(cors(corsOptions));

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const option = {
  ca: fs.readFileSync('fullchain.pem'),
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem'),
};
const port = process.env.PORT || 4000;
https.createServer(option, app.callback()).listen(port, () => {
  console.log(`[HTTPS] Server is started on port ${port}`);
});
