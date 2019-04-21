const db = require('../data/dbConfig.js')


module.exports = {
    get,
    insert
}


async function insert(game) {
    const id = await db('games').insert(game, 'id')
    return db('games')
    .where({ id })
    .first();
}


function get() {
    return db('games');
  }