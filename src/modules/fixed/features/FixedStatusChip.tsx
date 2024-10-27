import { Chip, ChipProps } from "@mui/material";
import { SAVING_STATUS_COLOR } from "constants/savings";

export default function FixedStatusChip(props: ChipProps & { id: number }) {
  const { id, ...rest } = props;
  return <Chip variant="soft" color={SAVING_STATUS_COLOR[id]} {...rest} />;
}
