import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';

export function WorkoutShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto', px: 2, pt: 'max(12px, env(safe-area-inset-top))' }}>
        <AppHeader />
      </Box>
      <Box component="main" sx={{ flex: 1, width: '100%', maxWidth: 520, mx: 'auto', px: 2, pt: 2, pb: 3, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {children}
      </Box>
      <BottomNav />
    </Box>
  );
}
