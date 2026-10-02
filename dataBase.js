const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite', storage: './db.sqlite3', logging: false,
});
async function clear() {
  await sequelize.transaction(async (transaction) => {
    for (const table of [
      'Comment', 'ArticleTag', 'UserFollowUser', 'UserFavoriteArticle',
      'Article', 'Tag', 'User',
    ]) {
      await sequelize.query(`DELETE FROM ${table};`, { transaction });
    }
  });
}
module.exports = { clear };
