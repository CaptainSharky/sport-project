
export interface Exercise {
  id: number;
  name: string;
  setCount: number;
  targetWeight: number;
  targetReps: number;
}

// Временные данные для демонстрации.

const dayOne: Exercise[] = [
  {
    id: 1,
    name: 'Жим штанги лёжа',
    setCount: 3,
    targetWeight: 40,
    targetReps: 8,
  },
  {
    id: 2,
    name: 'Жим платформы ногами',
    setCount: 3,
    targetWeight: 60,
    targetReps: 10,
  },
  {
    id: 3,
    name: 'Подтягивания',
    setCount: 3,
    targetWeight: 0,
    targetReps: 6,
  },
  {
    id: 4,
    name: 'Разгибания рук на блоке',
    setCount: 3,
    targetWeight: 15,
    targetReps: 10,
  },
];

const dayTwo: Exercise[] = [
  {
    id: 1,
    name: 'Ягодичный мост',
    setCount: 3,
    targetWeight: 40,
    targetReps: 10,
  },
  {
    id: 2,
    name: 'Махи гантелями в стороны',
    setCount: 3,
    targetWeight: 5,
    targetReps: 12,
  },
  {
    id: 3,
    name: 'Сгибания ног',
    setCount: 3,
    targetWeight: 25,
    targetReps: 10,
  },
  {
    id: 4,
    name: 'Подъём штанги на бицепс',
    setCount: 3,
    targetWeight: 15,
    targetReps: 10,
  },
];

const dayThree: Exercise[] = [
  {
    id: 1,
    name: 'Приседания в колодец',
    setCount: 3,
    targetWeight: 40,
    targetReps: 8,
  },
  {
    id: 2,
    name: 'Жим гантелей сидя',
    setCount: 3,
    targetWeight: 12,
    targetReps: 8,
  },
  {
    id: 3,
    name: 'Тяга штанги в наклоне',
    setCount: 4,
    targetWeight: 70,
    targetReps: 5,
  },
  {
    id: 4,
    name: 'Подтягивания',
    setCount: 3,
    targetWeight: 0,
    targetReps: 6,
  },
  {
    id: 5,
    name: 'Сгибания ног',
    setCount: 3,
    targetWeight: 30,
    targetReps: 10,
  },
];

export function getWorkoutExercises(day: number): Exercise[] {
  if (day === 1) return dayOne;
  if (day === 2) return dayTwo;
  if (day === 3) return dayThree;

  return [];
}

export type SavedSet = {
  weight: number;
  reps: number;
};
