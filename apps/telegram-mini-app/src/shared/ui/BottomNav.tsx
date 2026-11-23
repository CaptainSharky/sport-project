
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import { AppIcon } from './AppIcon';

const navItems = [
  { label: 'Главная', icon: 'house' },
  { label: 'Программа', icon: 'calendar-days' },
  { label: 'Actions', icon: 'actions' },
  { label: 'Прогресс', icon: 'progress-icon' },
  { label: 'Профиль', icon: 'user' },
] as const;

export function BottomNav() {
  return (
    <Box
      component="nav"
      aria-label="Основная навигация"
      sx={{
        width: '100%',
        maxWidth: 520,
        mx: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        pb: 'max(8px, env(safe-area-inset-bottom))',
      }}
    >
      <BottomNavigation
        value={0}
        showLabels
        sx={{
          height: 66,
          bgcolor: 'transparent',
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={
              <AppIcon
                name={item.icon}
                size={21}
                inactive={index !== 0}
              />
            }
            disabled={index !== 0}
            sx={{
              minWidth: 0,
              maxWidth: 'none',
              px: 0.25,
              '&.Mui-selected': {
                color: 'primary.main',
              },
              '&.Mui-disabled': {
                color: 'text.secondary',
                opacity: 0.85,
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '10px',
                whiteSpace: 'nowrap',
              },
              '& .MuiBottomNavigationAction-label.Mui-selected': {
                fontSize: '10px',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
