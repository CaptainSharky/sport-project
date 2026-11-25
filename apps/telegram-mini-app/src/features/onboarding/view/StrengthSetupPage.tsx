const SKIP_VALIDATION_IN_DEV = import.meta.env.DEV;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

import { AppHeader } from '../../../shared/ui/AppHeader';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { AppIcon } from '../../../shared/ui/AppIcon';

type Exercise = {
  id: number;
  name: string;
  hasWeight: boolean;
};

type ExerciseValue = {
  weight: string;
  reps: string;
};

const exercises: Exercise[] = [
  { id: 1, name: 'Жим штанги лёжа', hasWeight: true },
  { id: 2, name: 'Подтягивания', hasWeight: false },
  { id: 3, name: 'Жим платформы ногами', hasWeight: true },
  { id: 4, name: 'Махи гантелями в стороны', hasWeight: true },
  { id: 5, name: 'Ягодичный мост', hasWeight: true },
  { id: 6, name: 'Подъём штанги на бицепс', hasWeight: true },
  { id: 7, name: 'Разгибания рук на блоке', hasWeight: true },
  { id: 8, name: 'Приседания в колодец', hasWeight: true },
  { id: 9, name: 'Жим гантелей сидя', hasWeight: true },
  { id: 10, name: 'Тяга штанги в наклоне', hasWeight: true },
  { id: 11, name: 'Сгибания ног', hasWeight: true },
];

const initialValues: Record<number, ExerciseValue> =
  Object.fromEntries(
    exercises.map((exercise) => [
      exercise.id,
      { weight: '', reps: '' },
    ])
  );

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: 'text.primary',
    borderRadius: '22px',
    height: 42,

    '& fieldset': {
      borderColor: '#405052',
    },

    '&:hover fieldset': {
      borderColor: '#B6C2C2',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#C8F866',
    },
  },

  '& input': {
    py: 1,
    px: 1.5,
  },
};

export function StrengthSetupPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [showErrors, setShowErrors] = useState(false);

  function updateValue(
    id: number,
    field: keyof ExerciseValue,
    value: string
  ) {
    setValues((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        [field]: value,
      },
    }));
  }

  function isValid(exercise: Exercise): boolean {
    const value = values[exercise.id];
    const repetitions = Number(value.reps);
    const weight = Number(value.weight);

    const repetitionsValid =
      value.reps.trim() !== '' &&
      Number.isInteger(repetitions) &&
      repetitions >= 1 &&
      repetitions <= 10;

    const weightValid =
      !exercise.hasWeight ||
      (
        value.weight.trim() !== '' &&
        Number.isFinite(weight) &&
        weight > 0
      );

    return repetitionsValid && weightValid;
  }

  const allValid = exercises.every(isValid);

  function handleContinue() {
    if (SKIP_VALIDATION_IN_DEV) {
      navigate('/home');
      return;
    } // убрать проверку после тестирования всех экранов

    setShowErrors(true);

    if (!allValid) {
      return;
    }
    // Временный переход до подключения Backend API
    navigate('/home');
    }


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
          pb: 'max(20px, env(safe-area-inset-bottom))',
        }}
      >
        <AppHeader />

        <Box component="main" sx={{ pt: 2 }}>
          <Box
            component="button"
            type="button"
            onClick={() => navigate('/welcome')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              bgcolor: 'transparent',
              border: 0,
              color: 'text.secondary',
              mb: 2,
              p: 0,
              cursor: 'pointer',
            }}
          >
            <AppIcon
              name="arrow-left"
              size={20}
              inactive
            />

            <Typography sx={{ fontSize: 14 }}>
              Назад
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: 18,
              fontWeight: 700,
              mb: 1,
            }}
          >
            Стартовые силовые показатели
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: 14,
              lineHeight: 1.4,
              mb: 2,
            }}
          >
            Введи вес и число повторений до отказа.
            Эти данные можно изменить позже в настройках.
          </Typography>

          <Box
            sx={{
              bgcolor: '#273E30',
              borderRadius: '18px',
              p: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
              }}
            >
              <AppIcon
                name="circle-check"
                size={21}
              />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Как заполнить
              </Typography>
            </Box>

            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                lineHeight: 1.4,
              }}
            >
              Например: 80 кг на 5 повторений до отказа
              — вводи 80 и 5.
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 11,
              color: 'text.secondary',
              mb: 1,
            }}
          >
            УПРАЖНЕНИЯ
          </Typography>

          <Box
            sx={{
              height: 5,
              bgcolor: '#405052',
              borderRadius: 5,
              mb: 1.5,
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gap: 1.5,
            }}
          >
            {exercises.map((exercise) => {
              const value = values[exercise.id];
              const invalid =
                showErrors && !isValid(exercise);

              const invalidWeight =
                exercise.hasWeight &&
                (
                  !value.weight.trim() ||
                  !Number.isFinite(Number(value.weight)) ||
                  Number(value.weight) <= 0
                );

              const invalidReps =
                !value.reps.trim() ||
                !Number.isInteger(Number(value.reps)) ||
                Number(value.reps) < 1 ||
                Number(value.reps) > 10;

              return (
                <Box
                  key={exercise.id}
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: '14px',
                    p: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        bgcolor: '#314D36',
                        color: 'primary.main',
                        borderRadius: '9px',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {exercise.id}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {exercise.name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 1.5,
                    }}
                  >
                    {exercise.hasWeight && (
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: 'text.secondary',
                            fontSize: 12,
                            mb: 0.5,
                          }}
                        >
                          Вес, кг
                        </Typography>

                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          placeholder="0"
                          value={value.weight}
                          onChange={(event) =>
                            updateValue(
                              exercise.id,
                              'weight',
                              event.target.value
                            )
                          }
                          error={invalid && invalidWeight}
                          slotProps={{
                            htmlInput: {
                              min: 0,
                              step: 0.5,
                              inputMode: 'decimal',
                              'aria-label':
                                `Вес: ${exercise.name}`,
                            },
                          }}
                          sx={inputStyles}
                        />
                      </Box>
                    )}

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: 12,
                          mb: 0.5,
                        }}
                      >
                        Повторения
                      </Typography>

                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        placeholder="0"
                        value={value.reps}
                        onChange={(event) =>
                          updateValue(
                            exercise.id,
                            'reps',
                            event.target.value
                          )
                        }
                        error={invalid && invalidReps}
                        slotProps={{
                          htmlInput: {
                            min: 1,
                            max: 10,
                            step: 1,
                            inputMode: 'numeric',
                            'aria-label':
                              `Повторения: ${exercise.name}`,
                          },
                        }}
                        sx={inputStyles}
                      />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {showErrors && !allValid && (
            <Typography
              role="alert"
              sx={{
                color: '#F08078',
                fontSize: 13,
                mt: 2,
              }}
            >
              Заполни все упражнения: вес больше 0 кг
              и 1–10 повторений.
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <PrimaryButton
              onClick={handleContinue}
              endIcon={
                <AppIcon
                  name="arrow-right"
                  size={16}
                  dark
                />
              }
            >
              На главную страницу
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
