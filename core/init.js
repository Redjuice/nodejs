const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRoutes();
  }

  static initLoadRoutes() {
    const apiDirectory = `${process.cwd()}/app/api`;
    const whileLoadModule = (obj) => {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    };

    requireDirectory(module, apiDirectory, { visit: whileLoadModule });
  }
}

module.exports = InitManager;
