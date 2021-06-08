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

const create = async ({ name, budget }) => {
  const [id] = await db('accounts')
  .insert({ name, budget })
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts')
  .where('id', id)
  .update({name: account.name, budget: account.budget})
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
