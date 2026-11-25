import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import { Box } from '@mui/material';

import { AppHeader } from '../shared/ui/AppHeader';

import { WelcomePage } from '../features/onboarding/view/WelcomePage';
import { StrengthSetupPage } from '../features/onboarding/view/StrengthSetupPage';
import { HomePage } from '../features/home/view/HomePage';

import { ProgramPage } from '../features/program/view/ProgramPage';
import { WorkoutPlanPage } from '../features/workout/view/WorkoutPlanPage';
import { WorkoutActivePage } from '../features/workout/view/WorkoutActivePage';
import { ExerciseSetsPage } from '../features/workout/view/ExerciseSetsPage';
import { RestPage } from '../features/workout/view/RestPage';

import { WorkoutProvider } from '../features/workout/model/WorkoutContext';

function WelcomeRoute() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 520,
          mx: 'auto',
          px: 2,
          pt: 'max(12px, env(safe-area-inset-top))',
        }}
      >
        <AppHeader />
      </Box>

      <WelcomePage
        onStart={() => navigate('/setup')}
      />
    </Box>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <WorkoutProvider>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/welcome" replace />}
          />

          <Route path="/welcome" element={<WelcomeRoute />} />
          <Route path="/setup" element={<StrengthSetupPage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/program" element={<ProgramPage />} />

          <Route
            path="/workout/:day/plan"
            element={<WorkoutPlanPage />}
          />

          <Route
            path="/workout/:day/active"
            element={<WorkoutActivePage />}
          />

          <Route
            path="/workout/:day/exercise/:id"
            element={<ExerciseSetsPage />}
          />

          <Route
            path="/workout/:day/rest"
            element={<RestPage />}
          />

          <Route
            path="*"
            element={<Navigate to="/welcome" replace />}
          />
        </Routes>
      </WorkoutProvider>
    </BrowserRouter>
  );
}
