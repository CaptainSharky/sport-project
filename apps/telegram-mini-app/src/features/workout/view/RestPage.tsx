import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { WorkoutShell } from '../../../shared/ui/WorkoutShell';
import { useWorkout } from '../model/WorkoutContext';
import { getWorkoutExercises } from '../model/workoutData';

export function RestPage() {
  const navigate = useNavigate();

  const { day: dayParam } = useParams();
  const day = Number(dayParam);

  const {
    activeDay,
    saved,
    lastExerciseId,
    restUntil,
    clearRest,
  } = useWorkout();

  const exercise = getWorkoutExercises(day).find(
    (item) => item.id === lastExerciseId
  );

  const savedCount = saved[lastExerciseId]?.length ?? 0;
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil(((restUntil ?? Date.now()) - Date.now()) / 1000)));
  useEffect(() => {
    function update() { setRemaining(Math.max(0, Math.ceil(((restUntil ?? Date.now()) - Date.now()) / 1000))); }
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [restUntil]);

  function continueWorkout() {
    clearRest();

    navigate(
      `/workout/${day}/exercise/${lastExerciseId}`
    );
  }

  const time = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  return (
    <WorkoutShell>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
        <Box sx={{ bgcolor: '#314D36', color: 'primary.main', width: 82, height: 82, display: 'grid', placeItems: 'center', borderRadius: '50%', mb: 2 }}><AppIcon name="circle-check" size={38} /></Box>
        <Typography component="h1" sx={{ fontSize: 27, fontWeight: 700, mb: 1.5 }}>Подход сохранён!</Typography>
        <Typography sx={{ fontSize: 15, color: 'text.secondary', lineHeight: 1.4, mb: 3 }}>Отдохни перед следующим рабочим подходом.</Typography>

        <Typography
          sx={{
            color: 'primary.main',
            fontSize: 14,
            textAlign: 'center',
            mb: 2,
          }}
        >
          {exercise?.name}: записано {savedCount} из{' '}
          {exercise?.setCount ?? 0}
        </Typography>

        <Box sx={{ width: 188, height: 188, border: '5px solid #C8F866', borderRadius: '50%', display: 'grid', placeContent: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: 29, fontWeight: 600 }}>{time}</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>Таймер</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 'auto', pt: 3 }}><PrimaryButton onClick={continueWorkout}>Продолжить тренировку</PrimaryButton></Box>
    </WorkoutShell>
  );
}
