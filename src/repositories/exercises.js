import knex from '../connectors/pg';

export const getAllExercisesForUser = (userId) => knex('exercises')
  .where({ user_id: userId });

export const updateExercise = async (exerciseId, { weight, name, upperBody }) => knex
  .table('exercises')
  .where({ id: exerciseId })
  .first()
  .update({ weight, name, upperBody })
  .returning('*')
  .then(result => result[0]);
