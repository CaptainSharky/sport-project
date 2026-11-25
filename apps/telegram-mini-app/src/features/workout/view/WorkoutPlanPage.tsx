import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { WorkoutShell } from '../../../shared/ui/WorkoutShell';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { getWorkoutExercises } from '../model/workoutData';
import { useWorkout } from '../model/WorkoutContext';

export function WorkoutPlanPage() {
  const navigate = useNavigate();

  const { day: dayParam } = useParams();
  const day = Number(dayParam);

  const exercises = getWorkoutExercises(day);

  const {
    selectedWeek,
    start,
    isWorkoutDone,
  } = useWorkout();

  const done = isWorkoutDone(selectedWeek, day);

  if (!exercises.length) {
    return (
      <WorkoutShell>
        <Typography>
          Тренировка не найдена.
        </Typography>
      </WorkoutShell>
    );
  }
  return (
    <WorkoutShell>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
        <Typography sx={{ color: 'primary.main', fontSize: 12 }}>НЕДЕЛЯ {selectedWeek} · ДЕНЬ {day}</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>План тренировки</Typography>
      </Box>
      <Typography component="h1" sx={{ fontSize: 28, fontWeight: 700, mb: 1 }}>Тренировка {day}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 15, lineHeight: 1.4, mb: 1.5 }}>Ознакомься с упражнениями перед началом.</Typography>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        {exercises.map((exercise) => (
          <Box key={exercise.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper', borderRadius: '14px', px: 1.5, minHeight: 60 }}>
            <Box sx={{ width: 30, height: 30, border: '1px solid #788789', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'text.secondary', flexShrink: 0 }}>{exercise.id}</Box>
            <Typography sx={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{exercise.name}</Typography>
            <Box sx={{ bgcolor: '#314D36', borderRadius: '10px', p: 1 }}><AppIcon name="trending-up" size={22} /></Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 'auto', pt: 4 }}>
      <PrimaryButton
        endIcon={
          <AppIcon
            name={done ? 'arrow-left' : 'check'}
            size={17}
            dark
          />
        }
        onClick={() => {
          if (done) {
            navigate('/program');
            return;
          }

          start(day);
          navigate(`/workout/${day}/active`);
        }}
      >
        {done ? 'Вернуться к программе' : 'Начать тренировку'}
      </PrimaryButton>
      </Box>
    </WorkoutShell>
  );
}
