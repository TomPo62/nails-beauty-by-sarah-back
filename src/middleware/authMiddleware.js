const { expressjwt } = require('express-jwt');

function getJwtMiddleware(jwtSecretToken) {
  return expressjwt({
    secret: jwtSecretToken,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
  }).unless({ path: ['/api/login', '/api/logout'] });
}

module.exports = getJwtMiddleware;
