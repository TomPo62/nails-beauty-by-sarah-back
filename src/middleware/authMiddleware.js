const { expressjwt } = require('express-jwt')

function getJwtMiddleware(jwtSecretToken) {
  return expressjwt({
    secret: jwtSecretToken,
    algorithms: ['HS256'],
    getToken: (req) =>{
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        return req.headers.authorization.split(' ')[1]
      }
      return null
    },
  }).unless({ path: ['/api/login', '/api/logout'] })
}

module.exports = getJwtMiddleware
