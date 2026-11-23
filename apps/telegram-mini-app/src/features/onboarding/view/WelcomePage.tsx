import { Box, Typography } from '@mui/material';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';

const benefits = [
  'Индивидуальные рабочие веса',
  'Контроль каждого подхода',
  'История силового прогресса',
];

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 520,
        mx: 'auto',
        px: 2,
        pt: 2,
        pb: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Зелёная карточка STRONGER */}
      <Box
        sx={{
          minHeight: 176,
          bgcolor: '#273E30',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.5,
          mb: 1.5,
          px: 2,
        }}
      >
        <AppIcon name="brand-mark" size={68} />

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 600,
            lineHeight: 1.2,
            color: 'text.primary',
          }}
        >
          STRONGER
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: 'primary.main',
          }}
        >
          ТРЕНИРУЙСЯ С УМОМ
        </Typography>
      </Box>

      {/* Заголовок */}
      <Typography
        component="h1"
        sx={{
          fontSize: 'clamp(20px, 6.7vw, 26px)',
          fontWeight: 500,
          lineHeight: 1.2,
          mb: 1.5,
        }}
      >
        Твоя сила. Твой прогресс.
      </Typography>

      {/* Описание */}
      <Typography
        sx={{
          fontSize: 16,
          lineHeight: 1.35,
          color: 'text.secondary',
          mb: 1.5,
        }}
      >
        Персональная силовая программа на 9 недель с
        корректировкой рабочих весов по RPE.
      </Typography>

      {/* Преимущества */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {benefits.map((benefit) => (
          <Box
            key={benefit}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <AppIcon name="circle-check" size={24} />

            <Typography sx={{ fontSize: 16 }}>
              {benefit}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Кнопка внизу экрана */}
      <Box sx={{ mt: 'auto', pt: 4 }}>
        <PrimaryButton
          onClick={onStart}
          endIcon={<AppIcon name="arrow-right" size={16} dark />}
        >
          Начать
        </PrimaryButton>
      </Box>
    </Box>
  );
}
