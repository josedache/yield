export const FIXED_PRODUCT_ID = 1;

export const SAVING_STATUS_COLOR = {
  0: "error",
  100: "info",
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

export const SAVINGS_ACCOUNT_STATUS_TYPE = {
  INVALID: 0,
  SUBMITTED_AND_PENDING_APPROVAL: 100,
  APPROVED: 200,
  ACTIVE: 300,
  TRANSFER_IN_PROGRESS: 303,
  TRANSFER_ON_HOLD: 304,
  WITHDRAWN_BY_APPLICANT: 400,
  REJECTED: 500,
  CLOSED: 600,
  PRE_MATURE_CLOSURE: 700,
  MATURED: 800,
};

export const ALL_ACTIVE_SAVINGS_ACCOUNT_STATUS_TYPE = [
  { id: 0, name: "All" },
  { id: 100, name: "Draft" },
  // { id: 200, name: "Approved" },
  { id: 300, name: "Active" },
  // { id: 500, name: "Rejected" },
  { id: 600, name: "Closed" },
  { id: 800, name: "Matured" },
];
