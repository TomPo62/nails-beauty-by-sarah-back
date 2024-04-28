const jwt = require('jsonwebtoken')
const userOne = process.env.USER_ONE
const userTwo = process.env.USER_TWO
const pwdUserOne = process.env.PWD_USER_ONE
const pwdUserTwo = process.env.PWD_USER_TWO
const jwtSecret =process.env.JWT_SECRET

exports.login = (req, res) => {
  const { username, pwd } = req.body
  if (
    (username === userOne && pwd === pwdUserOne) ||
    (username === userTwo && pwd === pwdUserTwo)
  ) {
    const token = jwt.sign({username}, jwtSecret, { expiresIn: '1d'})
    res.status(200).send({ message: 'Logged in successfully!', token })
  } else {
    res.status(401).send('Unauthorized')
  }
}

exports.logout = (req, res) => {
  res.send({message: 'Logged out successfully!'})
};

