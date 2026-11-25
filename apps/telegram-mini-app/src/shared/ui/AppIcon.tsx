import { Box } from '@mui/material';

type IconName =
  | 'brand-logo'
  | 'brand-mark'
  | 'arrow-right'
  | 'arrow-left'
  | 'circle-check'
  | 'check'
  | 'calendar-check'
  | 'calendar-days'
  | 'house'
  | 'actions'
  | 'chart-no-axes-combined'
  | 'user'
  | 'trending-up'
  | 'lock'
  | 'chevron-right'
  | 'history'
  | 'progress-icon'
  | 'plus'
  | 'minus';

interface AppIconProps {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  inactive?: boolean;
  dark?: boolean;
}

export function AppIcon({
  name,
  size = 24,
  width,
  height,
  inactive = false,
  dark = false,
}: AppIconProps) {
  return (
    <Box
      component="img"
      src={`/icons/${name}.svg`}
      alt=""
      aria-hidden="true"
      sx={{
        display: 'block',
        width: width ?? size,
        height: height ?? size,
        objectFit: 'contain',
        flexShrink: 0,
        filter: dark
          ? 'brightness(0)'
          : inactive
            ? 'grayscale(1)'
            : 'none',
        opacity: inactive ? 0.7 : 1,
      }}
    />
  );
}
