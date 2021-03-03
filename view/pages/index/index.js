import {
  Base64
} from 'js-base64';

Page({
  // 获取token
  onGetToken() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100,
            },
            success: (res) => {
              wx.setStorageSync('token', res.data.token);
            },
          });
        }
      },
    });
  },
  // 验证token
  onVerifyToken() {
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 获取最新期刊
  onGetLatest() {
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'GET',
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 点赞
  onLike() {
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  // 取消点赞
  onDislike() {
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POST',
      data: {
        art_id: 1,
        type: 100
      },
      header: {
        Authorization: this._encode()
      },
      success: (res) => {
        console.log(res.data);
      },
    });
  },

  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return `Basic ${base64}`
  }
});