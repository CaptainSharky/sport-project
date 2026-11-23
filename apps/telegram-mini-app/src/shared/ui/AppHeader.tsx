
import { Box, Typography } from '@mui/material';
import { AppIcon } from './AppIcon';

export function AppHeader() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        minHeight: 56,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <AppIcon name="brand-logo" size={37} />

      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.2px',
        }}
      >
        SMART STRENGTH
      </Typography>
    </Box>
  );
}
