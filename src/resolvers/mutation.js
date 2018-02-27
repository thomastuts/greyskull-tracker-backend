import { updateExercise } from '../repositories/exercises';

export default {
  Mutation: {
    updateExercise: async (root, { id, weight, name, upperBody }, context) => {
      return await updateExercise(id, { weight, name, upperBody });
    }
  }
}
