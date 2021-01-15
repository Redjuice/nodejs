const Router = require("koa-router");
const router = new Router();
const { HttpException } = require("../../../core/http-exception");

router.post("/v1/:id/classic/book/latest", (ctx, next) => {
  if (true) {
    const error = new HttpException("错误原因", 10001, 400);
    throw error;
  }
});

module.exports = router;
