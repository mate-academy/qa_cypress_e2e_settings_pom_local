const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3',
  logging: false,
});

async function clear() {
  const transaction = await sequelize.transaction();
  const tables = [
    'Comment',
    'ArticleTag',
    'UserFavoriteArticle',
    'UserFollowUser',
    'Article',
    'Tag',
    'User',
  ];

  try {
    for (const table of tables) {
      await sequelize.query(`DELETE FROM ${table};`, { transaction });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { clear };
