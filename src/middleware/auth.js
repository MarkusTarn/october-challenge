const config = require('config');
const jwt = require('jsonwebtoken');


module.exports = async function(req, res, next) {
  const token = req.cookies['authorization'];
  if (!token) return res.redirect('/auth');

  try {
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return next(new ValidationError({}, 'Invalid token'));
  }
};