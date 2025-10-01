// dataBase.js
async function clear() {
  try {
    const { sequelize } = require('./api/models') // ✅ require inside
    await sequelize.truncate({ cascade: true })
    return null
  } catch (err) {
    console.error('❌ Clear failed:', err)
    throw err
  }
}

async function reset() {
  try {
    const { sequelize } = require('./api/models')
    await sequelize.sync({ force: true })
    return null
  } catch (err) {
    console.error('❌ Reset failed:', err)
    throw err
  }
}

module.exports = { clear, reset }
