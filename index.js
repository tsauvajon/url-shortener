const express = require('express');

const path = require('path');

const app = express();
const server = app.listen(3002, () => {
  console.log('server listening on port 3002');
});

// serve from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // send index.html
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', (req, res) => {

});

app.get('/:encoded_id', (req, res) => {

});
