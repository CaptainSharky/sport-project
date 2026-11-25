import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { WorkoutShell } from '../../../shared/ui/WorkoutShell';
import { useWorkout } from '../../workout/model/WorkoutContext';
import { getWorkoutExercises } from '../../workout/model/workoutData';

export function ProgramPage() {
  const navigate = useNavigate();
  const { selectedWeek, setSelectedWeek, isWorkoutDone } = useWorkout();
  return (
    <WorkoutShell>
      <Typography component="h1" sx={{ fontSize: 25, fontWeight: 700, mb: 1 }}>Моя программа</Typography>
      <Typography sx={{ fontSize: 15, color: 'text.secondary', lineHeight: 1.45, mb: 2 }}>
        Выбери неделю и тренировку. Пустой кружок станет зелёной галочкой после выполнения.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1.25, mb: 2 }}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map(week => (
          <Box key={week} component="button" type="button" aria-pressed={week === selectedWeek} onClick={() => setSelectedWeek(week)} sx={{ minHeight: 63, bgcolor: week === selectedWeek ? 'primary.main' : 'background.paper', color: week === selectedWeek ? 'primary.contrastText' : 'text.primary', border: 0, borderRadius: '16px', cursor: 'pointer', display: 'grid', placeContent: 'center', gap: '3px', textAlign: 'center' }}>
            <Typography sx={{ fontSize: 11, opacity: 0.8 }}>НЕДЕЛЯ</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{week}</Typography>
          </Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.25 }}>ТРЕНИРОВКИ НЕДЕЛИ {selectedWeek}</Typography>
      <Box sx={{ display: 'grid', gap: 1.25 }}>
        {[1, 2, 3].map(day => {
          const done = isWorkoutDone(selectedWeek, day);
          return (
            <Box key={day} component="button" type="button" onClick={() => navigate(`/workout/${day}/plan`)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper', borderRadius: '17px', border: 0, color: 'text.primary', textAlign: 'left', p: 1.5, minHeight: 70, cursor: 'pointer'}}>
              {done ? <AppIcon name="circle-check" size={30} /> : <Box sx={{ width: 30, height: 30, border: '2px solid #77898A', borderRadius: '50%', flexShrink: 0 }} />}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 15 }}>Тренировка {day}</Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{getWorkoutExercises(day).length} упражнения</Typography>
              </Box>
              <AppIcon name="chevron-right" size={23} />
            </Box>
          );
        })}
      </Box>
    </WorkoutShell>
  );
}
