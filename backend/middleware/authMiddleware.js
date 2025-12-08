const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'You are not logged.' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {id, role}
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expired.' });
  }
}

function allowSelf(req, res, next) {
    const loggedUserId = req.user.id;
    const paramId = req.params.id;

    if (loggedUserId !== paramId) {
        return res.status(403).json({ message: 'You are not allowed to edit this profile.' });
        console.log(loggedUserId);
        console.log(paramId);
    }
    next();
}

module.exports = { auth, allowSelf };