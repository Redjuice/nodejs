const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
  constructor(level = 1) {
    this.level = level;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32;
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      let errMasg = 'token不合法';
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMasg);
      }
      try {
        var decode = jwt.verify(
          userToken.name,
          global.config.security.secretKey
        );
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMasg = 'token已过期';
        }
        throw new global.errs.Forbbiden(errMasg);
      }

      if (decode.scope < this.level) {
        errMasg = '权限不足';
        throw new global.errs.Forbbiden(errMasg);
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };

      await next();
    };
  }
}

module.exports = {
  Auth,
};
