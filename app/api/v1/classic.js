const Router = require('koa-router');
const { Auth } = require('../../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../models/art');
const { Favor } = require('../../models/favor');
const { ClassicValidator } = require('../../validator/validator');
const router = new Router({
  prefix: '/v1/classic',
});

// 获取最新期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']],
  });
  const art = await Art.getData(flow.art_id, flow.type);
  art.setDataValue('index', flow.index);
  ctx.body = flow;
});

// 获取点赞信息
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));

  const art = await Art.getData(id, type);
  if (!art) {
    throw new global.errs.NotFound();
  }
  const favor = await Favor.userLikeIt(id, type, ctx.auth.uid);
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: favor,
  };
});

// 获取我喜欢的期刊
router.get('/favor', new Auth().m, async (ctx, next) => {
  ctx.body = await Favor.getMyClassicFavor(ctx.auth.uid);
});

// 获取期刊详情
router.get('/:type/:id', new Auth().m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  const id = v.get('path.id');
  const type = parseInt(v.get('path.type'));
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid);
  artDetail.art.setDataValue('like_status', artDetail.like_status);
  ctx.body = artDetail.art;
});

module.exports = router;
