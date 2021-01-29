const util = require('util');
const axios = require('axios');
const { User } = require('../models/user');
const { generateToken } = require('../../core/util');
const { Auth } = require('../../middlewares/auth');

class WXManager {
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    );

    const res = await axios.get(url);
    const { status, data } = await axios.get(url);
    if (status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败');
    }
    if (data.errcode) {
      throw new global.errs.AuthFailed('openid获取失败: ' + data.errmsg);
    }

    let user = await User.getUserByOpenid(data.openid);
    if (!user) {
      user = await User.registerByOpenid(data.openid);
    }
    return generateToken(user.id, Auth.USER);
  }
}

module.exports = {
  WXManager,
};
