const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// import mongoose, { Schema } from 'mongoose';

const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counter = mongoose.model('counter', CounterSchema);

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: String,
  created_at: Date,
});

urlSchema.pre('save', (next) => {
  const doc = this;
  counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 }}, (error, counter) => {
    if (error) {
      return next(error);
    }
    doc._id = counter.seq;
    doc.created_at = new Date();
    next();
  });
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
// export default Url;
