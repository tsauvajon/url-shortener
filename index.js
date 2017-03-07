const config = require('./config');

const base58 = require('./base58');

const bodyParser = require('body-parser');

const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const app = express();

const Url = require('./models/url');

// mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);


// handles JSON bodies
app.use(bodyParser.json());
// handles url encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// serve from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // send index.html
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', (req, res) => {
  const longUrl = req.body.url;
  Url.findOne({ long_url: longUrl }, (err, doc) => {
    if (doc) {
      const shortUrl = config.webhost.concat(base58.encode(doc._id));
      res.send({ 'shortUrl': shortUrl });
    } else {
      let newUrl = Url({
        long_url: longUrl,
      });
      newUrl.save((err) => {
        if (err) {
          res.send(err);
        }

        const shortUrl = config.webhost.concat(base58.encode(newUrl._id));
        res.send({ 'shortUrl': shortUrl });
      })
    }
  });
});

app.get('/:encoded_id', (req, res) => {
  const base58Id = req.params.encoded_id;
  const id = base58.decode(base58Id);

  Url.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
});

const server = app.listen(3002, () => {
  console.log('server listening on port 3002');
});
