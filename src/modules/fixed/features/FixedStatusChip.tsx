import { Chip, ChipProps } from "@mui/material";

export default function FixedStatusChip(props: ChipProps & { id: number }) {
  const { id, ...rest } = props;
  return <Chip variant="soft" color={SavingsStatusColorEnum[id]} {...rest} />;
}

const SavingsStatusColorEnum = {
  0: "error",
  100: "initial",
  200: "success",
  300: "success",
  303: "warning",
  304: "warning",
  400: "success",
  500: "error",
  600: "error",
  700: "error",
  800: "succcess",
};

enum SavingsAccountStatusType {
  INVALID = 0,
  SUBMITTED_AND_PENDING_APPROVAL = 100,
  APPROVED = 200,
  ACTIVE = 300,
  TRANSFER_IN_PROGRESS = 303,
  TRANSFER_ON_HOLD = 304,
  WITHDRAWN_BY_APPLICANT = 400,
  REJECTED = 500,
  CLOSED = 600,
  PRE_MATURE_CLOSURE = 700,
  MATURED = 800,
}
