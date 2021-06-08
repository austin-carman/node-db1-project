const db = require('../../data/db-config');

const getAll = () => {
  // return db.select('*').from('accounts');
  return db('accounts');
}

const getById = async (id) => {
  const result = await db('accounts')
    .where('id', id).first()

    return result
}

const create = async (account) => {
  const [id] = await db('accounts')
  .insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts')
  .where('id', id)
  .update(account)
  return getById(id)
}

const deleteById = async (id) => {
  const toRemove = await getById(id)
  await db('accounts')
    .where({ id })
    .del()

    return toRemove;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
