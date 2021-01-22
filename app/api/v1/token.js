const Router = require('koa-router');
const { TokenValidator } = require('../../validator/validator');

const router = new Router({
  prefix: '/v1/token',
});
router.post('/', async (ctx) => {
  await new TokenValidator().validate(ctx);
});

module.exports = router;
