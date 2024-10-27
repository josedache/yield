import { Chip, ChipProps } from "@mui/material";
import { SAVING_STATUS_COLOR } from "constants/savings";

export default function FixedStatusChip(props: ChipProps & { id?: number }) {
  const { id, label, ...rest } = props;
  return (
    <Chip
      variant="soft"
      label={id === 100 ? "Draft" : label}
      color={SAVING_STATUS_COLOR[id]}
      {...rest}
    />
  );
}
