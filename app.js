const Koa = require("koa");
const parser = require("koa-bodyparser");
const catchError = require("./middlewares/exception");
const InitManager = require("./core/init");


const app = new Koa();
app.use(parser());
app.use(catchError);

InitManager.initCore(app);

app.listen(3000);
