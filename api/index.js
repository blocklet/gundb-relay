const path = require('path');
const Gun = require('gun');
const express = require('express');

const env = require('./libs/env');

const app = express();

app.use(Gun.serve);

const port = process.env.BLOCKLET_PORT || 3030;

app.get('/', (req, res) => {
  res.send(`Relay Endpoint: ${env.appUrl}/gun`);
});

const server = app.listen(port, () => {
  console.log(`gun relay ready on port ${port}`);
});

const gun = Gun({ web: server, file: path.join(env.dataDir, 'gun') });

module.exports = { app, server, gun };
