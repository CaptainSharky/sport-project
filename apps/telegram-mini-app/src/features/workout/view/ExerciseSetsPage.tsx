import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { WorkoutShell } from '../../../shared/ui/WorkoutShell';
import { getWorkoutExercises } from '../model/workoutData';
import { useWorkout } from '../model/WorkoutContext';


type StepperProps = {
  title: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  step: number;
  min: number;
  max: number;
};

function Stepper({
  title,
  value,
  setValue,
  step,
  min,
  max,
}: StepperProps) {
  function decrease() {
    setValue((previous) =>
      Math.max(
        min,
        Number((previous - step).toFixed(1))
      )
    );
  }

  function increase() {
    setValue((previous) =>
      Math.min(
        max,
        Number((previous + step).toFixed(1))
      )
    );
  }

  return (
    <Box
      sx={{
        minWidth: 0,
        flex: 1,
        bgcolor: '#1B302B',
        borderRadius: '12px',
        p: 1.5,
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: 'text.secondary',
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 17,
          mb: 1,
        }}
      >
        {value}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box
          component="button"
          type="button"
          aria-label={`Уменьшить ${title}`}
          disabled={value <= min}
          onClick={decrease}
          sx={{
            width: 35,
            height: 35,
            display: 'grid',
            placeItems: 'center',
            bgcolor: '#354B49',
            border: 0,
            borderRadius: '8px',
            cursor: 'pointer',
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <AppIcon name="minus" size={17} />
        </Box>

        <Box
          component="button"
          type="button"
          aria-label={`Увеличить ${title}`}
          disabled={value >= max}
          onClick={increase}
          sx={{
            width: 35,
            height: 35,
            display: 'grid',
            placeItems: 'center',
            bgcolor: '#354B49',
            border: 0,
            borderRadius: '8px',
            cursor: 'pointer',
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <AppIcon name="plus" size={17} />
        </Box>
      </Box>
    </Box>
  );
}


export function ExerciseSetsPage() {
  const navigate = useNavigate();
  const { day: dayParam, id } = useParams();
  const day = Number(dayParam);
  const exercise = getWorkoutExercises(day).find(
    (item) => item.id === Number(id)
  );
  const {
    selectedWeek,
    activeDay,
    saved,
    saveSet,
  } = useWorkout();
  const savedCount = exercise && activeDay === day ? (saved[exercise.id]?.length ?? 0) : 0;
  const [weight, setWeight] = useState(exercise?.targetWeight ?? 0);
  const [reps, setReps] = useState(exercise?.targetReps ?? 5);

  useEffect(() => {
    setWeight(exercise?.targetWeight ?? 0);
    setReps(exercise?.targetReps ?? 5);
  }, [
    exercise?.id,
    day,
    exercise?.targetWeight,
    exercise?.targetReps,
  ]);

  if (!exercise) return <WorkoutShell><Typography>Упражнение не найдено.</Typography></WorkoutShell>;

  if (!exercise || activeDay !== day) {
    return (
      <WorkoutShell>
        <Typography sx={{ mb: 2 }}>
          Сначала начни тренировку из её плана.
        </Typography>

        <PrimaryButton
          onClick={() => navigate(`/workout/${day}/plan`)}
        >
          К плану
        </PrimaryButton>
      </WorkoutShell>
    );
  }

  const done = savedCount >= exercise.setCount;

  function handleSave() {
    if (!exercise || done) return;

    saveSet(exercise.id, {
      weight,
      reps,
    });

    if (savedCount + 1 === exercise.setCount) {
      navigate(`/workout/${day}/active`);
    } else {
      navigate(`/workout/${day}/rest`);
    }
  }

  return (
    <WorkoutShell>
      <Box component="button" type="button" onClick={() => navigate(`/workout/${day}/active`)} sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'transparent', border: 0, color: 'text.secondary', p: 0, cursor: 'pointer', alignSelf: 'start', mb: 1.5 }}>
        <AppIcon name="arrow-left" size={18} /><Typography sx={{ fontSize: 12 }}>НЕДЕЛЯ {selectedWeek} · ДЕНЬ {day}</Typography>
      </Box>
      <Typography component="h1" sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}> {exercise.name} </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}><Typography sx={{ fontSize: 12, color: 'text.secondary' }}>РАБОЧИЕ ПОДХОДЫ</Typography><Typography sx={{ fontSize: 12, color: 'primary.main' }}>{savedCount} / {exercise.setCount}</Typography></Box>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>{Array.from({ length: exercise.setCount }, (_, i) => <Box key={i} sx={{ height: 5, flex: 1, borderRadius: '5px', bgcolor: i < savedCount ? 'primary.main' : '#405052' }} />)}</Box>
      {!done && (
        <Box sx={{ bgcolor: '#273E30', border: '1px solid #C8F866', borderRadius: '17px', p: 1.5, mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography sx={{ color: 'primary.main', fontSize: 12 }}>ПОДХОД {savedCount + 1}</Typography><Typography sx={{ color: 'primary.main', fontSize: 12 }}>Текущий</Typography></Box>
          <Typography sx={{ fontSize: 27, fontWeight: 700, textAlign: 'center', mb: 1.5 }}>{exercise.targetWeight} кг × {exercise.targetReps}</Typography>
          <Box sx={{ borderTop: '1px solid #405746', pt: 1.5 }}><Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1 }}>Фактический результат</Typography></Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
            <Stepper title="Вес, кг" value={weight} setValue={setWeight} step={2.5} min={0} max={500} />
            <Stepper title="Повторения" value={reps} setValue={setReps} step={1} min={1} max={100} />
          </Box>
          <PrimaryButton onClick={handleSave} endIcon={<AppIcon name="check" size={17} dark />}>Сохранить подход</PrimaryButton>
        </Box>
      )}
      {Array.from({ length: exercise.setCount }, (_, i) => {
        const record = saved[exercise.id]?.[i];
        if (i === savedCount && !done) return null;
        return <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper', borderRadius: '14px', minHeight: 80, px: 1.5, mb: 1.5 }}>
          <Box sx={{ bgcolor: '#314D36', p: 1.5, borderRadius: '10px' }}><AppIcon name={record ? 'circle-check' : 'lock'} size={20} /></Box>
          <Box><Typography sx={{ fontSize: 14 }}>Подход {i + 1}</Typography><Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{record ? `${record.weight} кг · ${record.reps} повт.` : 'Ожидает предыдущего подхода'}</Typography></Box>
        </Box>;
      })}
      {done && <PrimaryButton onClick={() => navigate(`/workout/${day}/active`)}>Вернуться к тренировке</PrimaryButton>}
    </WorkoutShell>
  );
}
