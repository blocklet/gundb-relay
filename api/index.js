const path = require('path');
const Gun = require('gun');
const express = require('express');

const env = require('./libs/env');

const app = express();

app.use(Gun.serve);

const port = process.env.BLOCKLET_PORT || 3030;

app.get('/', (req, res) => {
  const url = new URL(env.appUrl);
  url.protocol = req.get('x-forwarded-proto') || req.protocol;
  url.pathname = '/gun';

  res.jsonp({ endpoint: url.href });
});

const server = app.listen(port, () => {
  console.log(`gun relay ready on port ${port}`);
});

const gun = Gun({ web: server, file: path.join(env.dataDir, 'gun') });

module.exports = { app, server, gun };
