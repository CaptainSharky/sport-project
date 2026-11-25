import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import {
  getWorkoutExercises,
  type SavedSet,
} from './workoutData';

type SavedWorkout = Record<number, SavedSet[]>;

type WorkoutState = {
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;

  activeDay: number;
  started: boolean;
  finished: boolean;

  saved: SavedWorkout;

  lastExerciseId: number;
  restUntil: number | null;

  completedWorkouts: Record<string, boolean>;

  isWorkoutDone: (week: number, day: number) => boolean;

  start: (day: number) => void;
  finish: () => void;

  saveSet: (id: number, set: SavedSet) => void;
  clearRest: () => void;

  complete: boolean;
};

const WorkoutContext = createContext<WorkoutState | null>(
  null
);

export function WorkoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedWeek, setSelectedWeek] = useState(2);
  const [activeDay, setActiveDay] = useState(3);

  const [started, setStarted] = useState(false);

  const [savedByWorkout, setSavedByWorkout] = useState<
    Record<string, SavedWorkout>
  >({});

  const [completedWorkouts, setCompletedWorkouts] = useState<
    Record<string, boolean>
  >({});

  const [lastExerciseId, setLastExerciseId] = useState(3);

  const [restUntil, setRestUntil] = useState<number | null>(
    null
  );

  // Уникальный ключ: неделя + день тренировки
  const workoutKey = `${selectedWeek}:${activeDay}`;

  const saved = savedByWorkout[workoutKey] ?? {};

  const exercises = getWorkoutExercises(activeDay);

  const complete =
    exercises.length > 0 &&
    exercises.every(
      (exercise) =>
        (saved[exercise.id]?.length ?? 0) >=
        exercise.setCount
    );

  const finished = Boolean(
    completedWorkouts[workoutKey]
  );

  function isWorkoutDone(week: number, day: number) {
    return Boolean(
      completedWorkouts[`${week}:${day}`]
    );
  }

  function start(day: number) {
    setActiveDay(day);
    setStarted(true);
    setRestUntil(null);
  }

  function finish() {
    if (!complete) return;

    setCompletedWorkouts((previous) => ({
      ...previous,
      [workoutKey]: true,
    }));

    setStarted(false);
    setRestUntil(null);
  }

  function saveSet(id: number, set: SavedSet) {
    const exercise = exercises.find(
      (item) => item.id === id
    );

    if (!exercise) return;

    if (
      (saved[id]?.length ?? 0) >= exercise.setCount
    ) {
      return;
    }

    setSavedByWorkout((previous) => {
      const currentWorkout =
        previous[workoutKey] ?? {};

      return {
        ...previous,
        [workoutKey]: {
          ...currentWorkout,
          [id]: [
            ...(currentWorkout[id] ?? []),
            set,
          ],
        },
      };
    });

    setLastExerciseId(id);
    setRestUntil(Date.now() + 180_000);
  }

  function clearRest() {
    setRestUntil(null);
  }

  return (
    <WorkoutContext.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        activeDay,
        started,
        finished,
        saved,
        lastExerciseId,
        restUntil,
        completedWorkouts,
        isWorkoutDone,
        start,
        finish,
        saveSet,
        clearRest,
        complete,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      'useWorkout must be inside WorkoutProvider'
    );
  }

  return context;
}