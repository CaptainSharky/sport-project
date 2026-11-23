
export interface HomeProgram {
  title: string;
  currentWeek: number;
  totalWeeks: number;
  completedWeeks: number;
  nextWorkout: {
    day: number;
    exercises: string[];
  };
}

export const mockHomeProgram: HomeProgram = {
  title: 'Основной цикл',
  currentWeek: 2,
  totalWeeks: 9,
  completedWeeks: 1,
  nextWorkout: {
    day: 3,
    exercises: [
      'Приседания в колодец',
      'Жим гантелей сидя',
      'Тяга штанги в наклоне',
      'Подтягивания',
      'Сгибания ног',
    ],
  },
};
