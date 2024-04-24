const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  const { username, pwd } = req.body
  if (
    (username === process.env.USER_ONE && pwd === process.env.PWD_USER_ONE) ||
    (username === process.env.USER_TWO && pwd === process.env.PWD_USER_TWO)
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.cookie('token', token, { httpOnly: true, secure: true })
    res.status(200).send({ message: 'Logged in successfully!', token })
  } else {
    res.status(401).send('Unauthorized')
  }
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.send({ message: 'Logged out successfully!' })
}
