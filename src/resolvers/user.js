import { getAllExercisesForUser } from '../repositories/exercises';

export default {
  User: {
    exercises: (user) => {
      return getAllExercisesForUser(user.id);
    },
  }
};
