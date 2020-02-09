const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { itemMap } = require('./ScoresModel');

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const mapper = (array) => array.map(score => (new Date(Date.parse(score.timestamp)).getMonth() === new Date().getMonth()) ? itemMap[score.item] * score.quantity : 0);
const scorePredicate = (a, b) => (b.scoreTotal > a.scoreTotal ? 1 : (b.scoreTotal > a.scoreTotal ? -1 : 0));

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  scores: {
    type: Array,
    required: false,
  },
  scoreTotal: {
    type: Number,
    required: true,
    default: 0
  },
  parties: {
    type: Array,
    required: false,
  },
  isAdmin: Boolean
});

UserSchema.methods.generateAuthToken = async function() { 
  const token = jwt.sign({ _id: this._id, name: this.name, isAdmin: this.isAdmin }, config.get('myprivatekey'));
  return token;
}

UserSchema.methods.calculateScoreTotal = async function() {
  this.scoreTotal = this.scores.length ? mapper(this.scores).reduce(reducer) : 0;
  await this.save();
}
UserSchema.methods.addScore = async function(score) {
  this.scores.unshift(score);
  await this.calculateScoreTotal();
  await this.save();
}

UserSchema.methods.joinParty = async function(party) {
  this.parties.push(party);
  await this.save();
}

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

async function getUser(id) {
  return User.findById({_id: id})
}

exports.User = User; 
exports.validate = validateUser;
exports.getUser = getUser;
exports.scorePredicate = scorePredicate;
