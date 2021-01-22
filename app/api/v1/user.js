const Router = require('koa-router');
const { RegisteredValidator } = require('../../validator/validator');
const { User } = require('../../models/user');
const { success } = require('../../lib/helper');

const router = new Router({
  prefix: '/v1/user',
});
router.post('/register', async (ctx) => {
  const v = await new RegisteredValidator().validate(ctx);
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname'),
  };
  await User.create(user);
  success();
});

module.exports = router;
