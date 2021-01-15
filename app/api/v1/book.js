const Router = require("koa-router");
const router = new Router();
const { PositiveIntegerValidator } = require("../../validator/validator");

router.post("/v1/:id/classic/book/latest", async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  const id = v.get("path.id");

  ctx.body = "成功";
});

module.exports = router;
