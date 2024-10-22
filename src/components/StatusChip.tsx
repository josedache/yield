import { Chip, ChipProps, useTheme } from "@mui/material";

function StatusChip(props: StatusChipProps) {
  const { ...restProps } = props;

  const theme = useTheme();

  return (
    <Chip
      variant="soft"
      size="small"
      icon={
        <svg height="16" width="16">
          <circle
            cx="8"
            cy="8"
            r="4"
            fill={theme.palette[props.color]?.main}
          />
        </svg>
      }
      {...restProps}
    />
  );
}

export default StatusChip;

export type StatusChipProps = ChipProps;
