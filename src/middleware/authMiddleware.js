const { expressjwt } = require('express-jwt');

function getJwtMiddleware(jwtToken) {
  return expressjwt({
    secret: jwtToken,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
  }).unless({ path: ['/api/login', '/api/logout'] });
}

module.exports = getJwtMiddleware;
