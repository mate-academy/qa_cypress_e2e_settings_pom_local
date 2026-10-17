'use strict';

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
  logging: false,
});

async function clear() {
  const t = await sequelize.transaction();

  try {
    await sequelize.query('DELETE FROM ArticleTag;', {
      transaction: t,
    });
    await sequelize.query('DELETE FROM UserFavoriteArticle;', {
      transaction: t,
    });
    await sequelize.query('DELETE FROM UserFollowUser;', {
      transaction: t,
    });
    await sequelize.query('DELETE FROM Comment;', {
      transaction: t,
    });
    await sequelize.query('DELETE FROM Article;', {
      transaction: t,
    });
    await sequelize.query('DELETE FROM Tag;', {
      transaction: t,
    });
    await sequelize.query('DELETE FROM User;', {
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = { clear };
