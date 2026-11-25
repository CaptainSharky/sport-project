
import { Box, Typography } from '@mui/material';

import { AppIcon } from '../../../shared/ui/AppIcon';

import { AppHeader } from '../../../shared/ui/AppHeader';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { BottomNav } from '../../../shared/ui/BottomNav';
import { mockHomeProgram } from '../model/homeData';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const program = mockHomeProgram;
  const exercises = program.nextWorkout.exercises;
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
      {/* Шапка */}
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

      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: 520,
          mx: 'auto',
          px: 2,
          pt: 2,
          pb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: 'text.secondary',
            mb: 1,
          }}
        >
          ТВОЯ СИЛОВАЯ ПРОГРАММА
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontSize: 'clamp(25px, 7vw, 28px)',
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          Время становиться сильнее
        </Typography>

        {/* Прогресс программы */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '22px',
            p: 2,
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: 'text.secondary',
              mb: 0.5,
            }}
          >
            {program.title.toUpperCase()}
          </Typography>

          <Typography
            sx={{
              fontSize: 27,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Неделя {program.currentWeek} из {program.totalWeeks}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              my: 1,
            }}
          >
            {Array.from(
              { length: program.totalWeeks },
              (_, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    height: 6,
                    borderRadius: 8,
                    bgcolor:
                      index < program.currentWeek
                        ? 'primary.main'
                        : '#405052',
                  }}
                />
              )
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              Пройдено недель
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {program.completedWeeks} / {program.totalWeeks}
            </Typography>
          </Box>
        </Box>

        {/* Ближайшая тренировка */}
        <Box
          sx={{
            bgcolor: '#273E30',
            borderRadius: '22px',
            p: 2,
            mb: 1.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: 'primary.main',
              }}
            >
              БЛИЖАЙШАЯ ТРЕНИРОВКА
            </Typography>

            <AppIcon name="calendar-check" size={29} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              pb: 1,
              mb: 1,
              borderBottom: '1px solid #405746',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              День {program.nextWorkout.day}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                color: 'text.secondary',
              }}
            >
              {exercises.length} упражнений
            </Typography>
          </Box>

          {/* Упражнения */}
          <Box
            sx={{
              display: 'grid',
              gap: 0.75,
              mb: 1.5,
            }}
          >
            {exercises.map((exercise, index) => (
              <Box
                key={`${index}-${exercise}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  minHeight: 26,
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#405D35',
                    color: 'primary.main',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    fontSize: 13,
                  }}
                >
                  {index + 1}
                </Box>

                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.35,
                  }}
                >
                  {exercise}
                </Typography>
              </Box>
            ))}
          </Box>

          <PrimaryButton
            onClick={() => navigate('/workout/3/plan')}
            endIcon={
              <AppIcon
                name="arrow-right"
                size={16}
                dark
              />
            }
          >
            Открыть тренировку
          </PrimaryButton>
        </Box>

        {/* Моя программа */}
        <Box
          component="button"
          type="button"
          onClick={() => navigate('/program')}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '18px',
            border: 'none',
            color: 'text.primary',
            fontFamily: 'inherit',
            textAlign: 'left',
            cursor: 'pointer',
            p: 1.75,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            '&:hover': {
              bgcolor: '#293738',
            },
            '&:focus-visible': {
              outline: '2px solid #C8F866',
              outlineOffset: 2,
            },
          }}
        >
          <Box
            sx={{
              bgcolor: '#314D36',
              borderRadius: '12px',
              p: 1,
              display: 'flex',
              flexShrink: 0,
            }}
          >
            <AppIcon name="calendar-days" size={24} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              Моя программа
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: 'text.secondary',
              }}
            >
              Все недели и тренировки
            </Typography>
          </Box>

          <AppIcon name="chevron-right" size={23} />
        </Box>

      </Box>

      <BottomNav />
    </Box>
  );
}
