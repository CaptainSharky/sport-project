import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { AppHeader } from '../shared/ui/AppHeader';
import { WelcomePage } from '../features/onboarding/view/WelcomePage';
import { StrengthSetupPage } from '../features/onboarding/view/StrengthSetupPage';
import { HomePage } from '../features/home/view/HomePage';


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
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomeRoute />} />
        <Route path="/setup" element={<StrengthSetupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
