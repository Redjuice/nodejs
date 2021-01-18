const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRoutes();
    InitManager.loadConfig();
    InitManager.loaderHttpException();
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
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

  static loaderHttpException() {
    const errors = require('./http-exception');
    global.errs = errors;
  }
}

module.exports = InitManager;
