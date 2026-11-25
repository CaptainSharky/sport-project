import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { AppIcon } from './AppIcon';

const items = [
  { label: 'Главная', icon: 'house', path: '/home' },
  {
    label: 'Программа',
    icon: 'calendar-days',
    path: '/program',
  },
  { label: 'Actions', icon: 'actions', path: null },
  {
    label: 'Прогресс',
    icon: 'chart-no-axes-combined',
    path: null,
  },
  { label: 'Профиль', icon: 'user', path: null },
] as const;

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const selected = location.pathname === '/home'
    ? 0
    : location.pathname.startsWith('/program') ||
        location.pathname.startsWith('/workout')
      ? 1
      : -1;

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
        showLabels
        value={selected}
        sx={{
          height: 66,
          bgcolor: 'transparent',
        }}
      >
        {items.map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={
              <AppIcon
                name={item.icon}
                size={21}
                inactive={selected !== index}
              />
            }
            disabled={item.path === null}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
            sx={{
              minWidth: 0,
              maxWidth: 'none',
              px: 0,
              color: 'text.secondary',
              cursor: item.path ? 'pointer' : 'default',

              '&.Mui-selected': {
                color: 'primary.main',
              },

              '&.Mui-disabled': {
                opacity: 0.8,
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
