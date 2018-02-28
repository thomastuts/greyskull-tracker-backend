import db from '../connectors/massive';

export const getAllExercisesForUser = (userId) => db.exercises.find({ user_id: userId });

export const updateExercise = async (exerciseId, { weight, name, upperBody }) => db
  .exercises
  .update(
    { id: exerciseId },
    {
      weight,
      name,
      upperBody
    }
  );
