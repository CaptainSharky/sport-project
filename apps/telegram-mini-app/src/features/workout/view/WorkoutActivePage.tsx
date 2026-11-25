import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { WorkoutShell } from '../../../shared/ui/WorkoutShell';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { getWorkoutExercises } from '../model/workoutData';
import { useWorkout } from '../model/WorkoutContext';

export function WorkoutActivePage() {
  const navigate = useNavigate();
  const { day: dayParam } = useParams();
  const day = Number(dayParam);

  const exercises = getWorkoutExercises(day);

  const {
    selectedWeek,
    activeDay,
    saved,
    complete,
    finish,
  } = useWorkout();
  const [showNotice, setShowNotice] = useState(false);


  if (!exercises.length || activeDay !== day) {
    return (
      <WorkoutShell>
        <Typography sx={{ mb: 2 }}>
          Сначала начни эту тренировку из плана.
        </Typography>

        <PrimaryButton
          onClick={() => navigate(`/workout/${day}/plan`)}
        >
          К плану
        </PrimaryButton>
      </WorkoutShell>
    );
  }


  function handleFinish() {
    if (!complete) { setShowNotice(true); return; }
    finish();
    navigate('/program');
  }

  return (
    <WorkoutShell>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
        <Typography sx={{ color: 'primary.main', fontSize: 12 }}>НЕДЕЛЯ {selectedWeek} · ДЕНЬ {day}</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>В процессе</Typography>
      </Box>
      <Typography component="h1" sx={{ fontSize: 28, fontWeight: 700, mb: 1 }}>Тренировка {day}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 15, lineHeight: 1.4, mb: 1.5 }}>Открывай упражнения и записывай результаты подходов.</Typography>
      <Box sx={{ display: 'grid', gap: 1.25 }}>
        {exercises.map((exercise) => {
          const count = saved[exercise.id]?.length ?? 0;
          return (
            <Box key={exercise.id} component="button" type="button" onClick={() => navigate(`/workout/${day}/exercise/${exercise.id}`)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper', border: 0, color: 'text.primary', textAlign: 'left', borderRadius: '14px', px: 1.5, minHeight: 65, cursor: 'pointer' }}>
              <Box sx={{ width: 30, height: 30, border: '1px solid #788789', borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{exercise.id}</Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 15 }}>{exercise.name}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{count} из {exercise.setCount} подходов записано</Typography>
              </Box>
              <Box sx={{ bgcolor: '#314D36', borderRadius: '10px', p: 1 }}><AppIcon name="trending-up" size={22} /></Box>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mt: 'auto', pt: 4 }}>
        {showNotice && !complete && <Typography role="alert" sx={{ color: '#F08078', fontSize: 13, mb: 1.5 }}>Запиши все подходы, чтобы завершить тренировку.</Typography>}
        <PrimaryButton endIcon={<AppIcon name="check" size={17} dark />} onClick={handleFinish}>Завершить тренировку</PrimaryButton>
      </Box>
    </WorkoutShell>
  );
}
