import { Chip, ChipProps } from "@mui/material";
import { SAVING_STATUS_COLOR } from "constants/savings";

export default function FixedPlanGiftedStatusChip(
  props: ChipProps & { id: any }
) {
  const { id, label, ...rest } = props;
  return (
    <Chip
      variant="soft"
      label={{ 100: "Draft", 300: "Sent" }[id] ?? label}
      color={SAVING_STATUS_COLOR[id]}
      {...rest}
    />
  );
}
