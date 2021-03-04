const { Op } = require('sequelize');
const { flatten } = require('lodash');
const { Movie, Sentence, Music } = require('./classic');
const { Favor } = require('../models/favor');

class Art {
  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type;
  }

  async getDetail(uid) {
    const art = await Art.getData(this.art_id, this.type)
    if (!art) throw new global.errs.NotFound()
    const favor = await Favor.userLikeIt(this.art_id, this.type, uid);
    return {
      art,
      like_status: favor
    }
  }



  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    };

    for (const artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id);
    }

    const arts = [];
    for (let key in artInfoObj) {
      if (Object.hasOwnProperty.call(artInfoObj, key)) {
        const ids = artInfoObj[key];
        if (!ids.length) continue;
        key = parseInt(key);
        arts.push(await Art._getListByType(ids, key));
      }
    }
    return flatten(arts);
  }

  static async _getListByType(ids, type) {
    const finder = {
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    };
    let arts = [];

    switch (type) {
      case 100:
        arts = await Movie.findAll(finder);
        break;
      case 200:
        arts = await Music.findAll(finder);
        break;
      case 300:
        arts = await Sentence.findAll(finder);
        break;
      case 400:
        break;
      default:
        break;
    }

    return arts;
  }

  static async getData(art_id, type) {
    const finder = {
      where: {
        id: art_id,
      },
    };
    let art = null;

    switch (type) {
      case 100:
        art = await Movie.findOne(finder);
        break;
      case 200:
        art = await Music.findOne(finder);
        break;
      case 300:
        art = await Sentence.findOne(finder);
        break;
      case 400:
        break;
      default:
        break;
    }

    return art;
  }
}

module.exports = { Art };
