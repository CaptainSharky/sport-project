import { Button, type ButtonProps } from '@mui/material';

export function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      fullWidth
      sx={[
        {
          minHeight: 44,
          fontSize: 14,
          fontWeight: 600,
        },
        ...(Array.isArray(props.sx)
          ? props.sx
          : props.sx
            ? [props.sx]
            : []),
      ]}
    />
  );
}
