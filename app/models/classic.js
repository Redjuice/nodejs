const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');

const classField = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.STRING,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
};

class Movie extends Model {}
Movie.init(classField, {
  sequelize,
  tableName: 'movie',
});

class Sentence extends Model {}
Sentence.init(classField, {
  sequelize,
  tableName: 'sentence',
});

class Music extends Model {}
const musicField = Object.assign(
  {
    url: Sequelize.STRING,
  },
  classField
);
Music.init(musicField, {
  sequelize,
  tableName: 'music',
});

module.exports = { Movie, Sentence, Music };
